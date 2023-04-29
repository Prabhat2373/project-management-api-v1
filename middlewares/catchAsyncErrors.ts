export = (thenFn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(thenFn(req, res, next)).catch(next);
};
