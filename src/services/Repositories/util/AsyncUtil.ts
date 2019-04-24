import { createConnection } from "../../SqlService";

interface OkPacket {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: any; // TODO: Determine Enumerable Statuses
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}

const asyncQuery = async <T>(queryString: string, args?: any[]): Promise<T[]> => {
    return new Promise<T[]>((resolve, reject) => {
        const connection = createConnection();
        connection.query(queryString, args, (err, result: T[]) => {
            if (err) {
                reject(err);
            } else {
                console.log({ result });
                resolve(result);
            }
        })
    });
}

const asyncQueryFirst = async <T>(queryString: string, args?: any[]): Promise<T> => {
    const results: T[] = await asyncQuery<T>(queryString, args);
    return results[0];
}

const asyncInsert = async <T>(queryString: string, args?: any[]): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        const connection = createConnection();
        connection.query(queryString, args, (err, result: OkPacket) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.insertId);
            }
        });
        connection.end();
    });
}

const AsyncUtil = {
    query: asyncQuery,
    queryFirst: asyncQueryFirst,
    insert: asyncInsert,
}

export default AsyncUtil;
export { asyncQuery, asyncQueryFirst, asyncInsert };