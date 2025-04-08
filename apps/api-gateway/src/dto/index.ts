// Exporter d'abord le DTO d'authentification (qui contient l'enum UserRole)
export * from './auth.dto';

// Puis exporter les autres DTOs qui dépendent de UserRole
export * from './user.dto';
export * from './order.dto';
export * from './product.dto';
export * from './location.dto'; 