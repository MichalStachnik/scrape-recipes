import express from 'express';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import Body from './models/Body';

function fetchLaurainthekitchen(req: express.Request, res: express.Response, next: express.NextFunction) {
  fetch('https://www.laurainthekitchen.com/recipes/croque-madam/')
    .then((res: any) => res.text())
    .then((data: any) => {
      const html = data;
      const $ = cheerio.load(html);
      let response: { [key: string]: any[] } = {
        'ingredients': [],
        'steps': []
      };

      // get ingredients and steps
      const ingredients = $('#recipe-ingredients li');
      ingredients.each((i: number, el: any) => {
        response.ingredients.push(el.children[1].data);
      });

      // get recipe
      const recipe = $('#recipe-process ul');
      const recipeString = recipe.text();
      const recipeTextAsArray 
        = recipeString
            .split('\n')
            .filter((recipe: any) => recipe.trim().length > 0)
            .map((recipe: any) => recipe.trim());
      recipeTextAsArray.forEach((step: any) => {
        response.steps.push(step);
      });

      res.send(response);
      next();
  })
  .catch((err: Error) => console.warn('error:', err));
}

function fetchMaangi(req: express.Request, res: express.Response, next: express.NextFunction) {
  fetch('https://www.maangchi.com/recipe/bugeopo-gochujang-muchim')
    .then((res: Body) => res.text())
    .then((data: string) => {
      const html = data;
      const $ = cheerio.load(html);
      let response: { [key: string]: any[] } = {
        'ingredients': [],
        'steps': []
      };

      // get ingredients
      const ingredientsLi = $('#main div.entry ul li');
      ingredientsLi.each((i, el) => {
        const li = $(el).text();
        response.ingredients.push(li);
      });

      // get recipe
      const ols = $('#main div.entry ol');
      const directionsArr 
        = ols
          .text()
          .split('\n')
          .filter(item => item.length > 0);
      
      response = {
        ...response,
        'steps': directionsArr
      }

      res.send(response);
      next();
    })
    .catch((err: Error)  => console.warn(err));
}

function fetchEatTheLove(req: express.Request, res: express.Response, next: express.NextFunction) {
  fetch('https://www.eatthelove.com/cookies-and-cream-cookies')
    .then((res: Body) => res.text())
    .then((data: string) => {
      const html = data;
      const $ = cheerio.load(html);
      let response: { [key: string]: any[] } = {
        'ingredients': [],
        'steps': []
      };

      // get ingredients
      const ingredientsSpans = $('div p span[itemprop=ingredients]');
      ingredientsSpans.each((i, el) => {
        const ingredient = $(el).text();
        response.ingredients.push(ingredient);
      });

      // get recipe
      const recipe = $('div p span[itemprop=recipeInstructions]');
      response.steps.push(recipe.text());

      // NO GOOD WAY OF GETTING THIS HTML
      const entryContentPs = $('div.entry-content p');
      let thePTagDirectionsINeed: string[] = [];
      entryContentPs.each((i, el) => {
        const pTag = $(el);
        const firstChar: any = pTag.text().charAt(0);
        
        if (firstChar.length > 0 && ((Number(firstChar) > 0) || (Number(firstChar) <= 9))) {
          thePTagDirectionsINeed.push(pTag.text());
          response.steps.push(pTag.text());
        }
        
      });
      res.send(response);
      next();
    })
    .catch((err: Error)  => console.warn(err))
}

function fetchNyt(req: express.Request, res: express.Response, next: express.NextFunction) {
  fetch(`https://cooking.nytimes.com/recipes/1017518-panzanella-with-mozzarella-and-herbs`)
  .then((res: Body) => res.text())
  .then((data: string) => {
    const html = data;
    const $ = cheerio.load(html);
    let response: { [key: string]: any[] } = {
      'ingredients': [],
      'steps': []
    };

    // get ingredients
    const ingredients = $('.recipe-instructions li[itemprop=recipeIngredient]');
    const ingredientsText: string = ingredients.text();
    let ingredientsArray: string[] = ingredientsText
      .split('\n')
      .filter((item: string) => item.trim())    // return true if after trim there is still content
      .map((item: string) => item.trim());      // remove remaining whitespace
    
    // construct response
    let ingredientString: string;
    ingredientsArray.forEach((ingredient) => {
      if (ingredient.length === 1) {
        ingredientString = ingredient;
      } else {
        ingredientString += ` ${ingredient}`;
        response.ingredients.push(ingredientString);
      }
    });

    // get steps
    const steps = $('ol[itemprop=recipeInstructions] li');
    steps.each((i, el) => {
      const step = $(el);
      response.steps.push(step.text());
    })

    res.send(response);
    next();
  })
  .catch((err: Error)  => console.warn(err))
}

export {
  fetchLaurainthekitchen,
  fetchMaangi,
  fetchEatTheLove,
  fetchNyt
}
