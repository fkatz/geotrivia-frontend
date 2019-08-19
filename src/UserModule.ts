class UserModule {
    public get token(): string {
        let token = localStorage.getItem("token");
        return token == null ? "" : token;
    }
    public set token(token: string) {
        localStorage.setItem("token", token);
    }
    public get username(): string {
        try {
            return JSON.parse(atob(this.token.split(".")[1])).sub;
        }
        catch{
            return "";
        }
    };
    public get logged(): boolean {
        return localStorage.getItem("token") != null;
    }
    public logout():void{
        localStorage.removeItem("token");
    }
}
export default new UserModule();