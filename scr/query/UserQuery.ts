class UserQuery {
    static async registUser (client: any,request:any,password:string) {
        const { full_name, email}: any = request.body
        const sql: string='INSERT INTO t_user (full_name, email, password) VALUES ($1, $2, $3)'
        const result: any = await client.query(sql, [full_name,email,password]);
        return result;    
    }
    static async loginUser (client: any,request:any) { 
        const email: any = request.body.email.toString()
        const sql: string='SELECT * FROM t_user WHERE email = $1'
        const result: any = await client.query(sql, [email]);
        return result;    
    }
}

export default UserQuery;