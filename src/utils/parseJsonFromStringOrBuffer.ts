export function parseJsonFromStringOrBuffer<V>(r: string | Buffer) {
    if (typeof r === 'string') return JSON.parse(r) as V;
    return JSON.parse(r.toString('utf-8')) as V;
}