export default interface Body {
  bodyUsed: boolean;
  body: NodeJS.ReadableStream;
  json(): Promise<any>;
  json<T>(): Promise<T>;
  text(): Promise<string>;
  buffer(): Promise<Buffer>;
}