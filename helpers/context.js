import User from "../models/User.js";
import jwtDecode from "jwt-decode";
import requestIP from "request-ip";
import geoip from "geoip-lite";
import MobileDetect from "mobile-detect";

export const getContext = async (req, token) => {
    if(!token){
        return {}
    }
    const jwt = token.split(" ")[1];
    const userData = jwtDecode(jwt);
    const user = await User.findById(userData._id).lean();
    delete user.password;
    
    const ip = requestIP.getClientIp(req);
    const geo = geoip.lookup(ip);
    const md = new MobileDetect(req.headers['user-agent']);
    const context = {
        user,
        ip,
        geo,
        md,
    };

    return context;
}