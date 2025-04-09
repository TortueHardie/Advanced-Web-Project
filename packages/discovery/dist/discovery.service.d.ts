export interface ServiceInfo {
    name: string;
    url: string;
    swaggerUrl?: string;
}
export declare class DiscoveryService {
    private services;
    registerService(serviceInfo: ServiceInfo): Promise<void>;
    getService(name: string): ServiceInfo | undefined;
    getAllServices(): ServiceInfo[];
}
