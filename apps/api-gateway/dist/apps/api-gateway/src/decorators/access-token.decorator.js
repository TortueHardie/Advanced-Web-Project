"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessToken = void 0;
const common_1 = require("@nestjs/common");
exports.AccessToken = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    return authHeader;
});
//# sourceMappingURL=access-token.decorator.js.map