import { Injectable, NestMiddleware } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { NextFunction, Request, Response } from 'express';

// ! const cachedModels = {}; // зовнішня змінна для зберігання створених моделей
const companiesCashedModels: string[] = [];

@Injectable()
export class ModelsInitializerMiddleware implements NestMiddleware {
  constructor(factories: ModelFactory[]) {}
  use(req: Request, res: Response, next: NextFunction) {
    const [companyId] = req.originalUrl.replace('/api/', '').split('/');
    if (!isValidObjectId(companyId)) {
      console.log(companyId);

      return next();
    }
    console.log(companyId);
    next();
  }
}

export class ModelFactory {
  create: (companyId: string) => Model<any>;
}

export function ModelsInitializer(factories: typeof ModelFactory[] = []) {
  function fn(req: Request, res: Response, next: NextFunction) {
    const [companyId] = req.originalUrl.replace('/api/', '').split('/');

    if (!isValidObjectId(companyId)) {
      next();
      return;
    }

    if (companiesCashedModels.includes(companyId)) {
      // перевірка чи моделі вже були створені
      // console.log("cachedModels", companiesCashedModels);
      // !  req.models = cachedModels[companyId];
    } else {
      const models = factories.map((Factory) => {
        const { create } = new Factory();
        console.log(companyId, '======>>>>>', models);
        return create(companyId);
      });

      // console.log("created models", models);
      // ! cachedModels[companyId] = Models; // зберігання створених моделей
      companiesCashedModels.push(companyId);

      // console.log("cachedModels", companiesCashedModels);
    }

    next();
  }

  return fn;
}
