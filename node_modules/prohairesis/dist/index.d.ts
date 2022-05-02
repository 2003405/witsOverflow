import { Pool, PoolConfig, PoolConnection, OkPacket } from 'mysql';
export declare class Prohairesis {
    pool: Pool;
    constructor(config: string | PoolConfig);
    query<TableModel>(sql: string, values?: Record<string, any>): Promise<TableModel[]>;
    execute(sql: string, values?: Record<string, any>): Promise<OkPacket>;
    getOne<TableModel>(sql: string, params: Record<string, any>): Promise<TableModel>;
    getValue<TableModel, K extends keyof TableModel>(column: K, sql: string, params: Record<string, any>): Promise<TableModel[K]>;
    exists<TableModel>(sql: string, params: Record<string, any>): Promise<boolean>;
    insert(table: string, data: Record<string, any>): Promise<OkPacket>;
    getConnection(): Promise<PoolConnection>;
    close(): void;
    queryFromFile<TableModel>(filePath: string, params?: Record<string, any>): Promise<TableModel[]>;
}
