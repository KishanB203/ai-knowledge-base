import type { Request, Response } from 'express';

export function getHealth(_req: Request, res: Response) {
  res.json({
    success: true,
    data: {
      service: 'knowledge-base-api',
      status: 'ok',
    },
  });
}
