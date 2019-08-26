class UserModule {
    public emitter:EventTarget = new EventTarget();
    public get token(): string {
        let token = localStorage.getItem("token");
        return token == null ? "" : token;
    }
    public set token(token: string) {
        localStorage.setItem("token", token);
        if(this.logged) this.emitter.dispatchEvent(new Event("login"));
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
        this.emitter.dispatchEvent(new Event("logout"));
    }
}
export default new UserModule();