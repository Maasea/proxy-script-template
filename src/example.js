export function parseBody (body) {
  return (typeof body == "string") ? JSON.parse(body) : body;
}

export function stringifyBody (body) {
  return (typeof body == "object") ? JSON.stringify(body) : body;
}
