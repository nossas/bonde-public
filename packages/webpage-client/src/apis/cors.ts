const ALLOWED_ORIGINS = [
  /^https?:\/\/(www\.)?brasilcontrabets\.com$/,
  /^https?:\/\/([a-z0-9-]+\.)*bonde\.org$/,
];

// Applies CORS headers and answers preflight requests.
// Returns true when the request was fully handled (OPTIONS) and the caller should stop.
export const applyCors = (req: any, res: any): boolean => {
  const { origin } = req.headers;

  if (origin && ALLOWED_ORIGINS.some((pattern) => pattern.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }

  return false;
};
