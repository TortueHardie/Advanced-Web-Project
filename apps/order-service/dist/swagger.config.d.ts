import { SwaggerCustomOptions } from '@nestjs/swagger';
export declare const swaggerConfig: Omit<import("@nestjs/swagger").OpenAPIObject, "paths">;
export declare const swaggerDocumentOptions: {
    operationIdFactory: (controllerKey: string, methodKey: string) => string;
    deepScanRoutes: boolean;
};
export declare const swaggerSetupOptions: SwaggerCustomOptions;
