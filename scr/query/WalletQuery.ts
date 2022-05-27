class WalletQuery {
    static async getAllWallet (client: any) {
        const sql: string = "SELECT * FROM t_wallet";
        const result: any = await client.query(sql);
        return result;    
    }
    static async insertWalletData (client: any,request:any) {
        const { income, expenses }: any = request.body
        const sql: string='INSERT INTO t_wallet (income, expenses) VALUES ($1, $2)'
        const result: any = await client.query(sql, [income, expenses]);
        return result;    
    }
    static async updateWalletData (client: any, request: any) {
        const { id, income, expenses } = request.body
        const sql: string= 'UPDATE t_wallet SET income = $1, expenses = $2 WHERE id = $3'
        const result: any = await client.query(sql,[income, expenses, id],);
        return result;    
    }
    static async getWalletById (client: any,request: any) {
        const id = parseInt(request.params.id)
        const sql: string = 'SELECT * FROM t_wallet WHERE id = $1';
        const result: any = await client.query(sql,[id]);
        return result;    
    }
}

export default WalletQuery;