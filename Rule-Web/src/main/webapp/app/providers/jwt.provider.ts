/**
 * @author chathura widanage
 */
import {Injectable} from "angular2/core";
@Injectable()
export class JwtProvider {
    /**
     * removes token from the browser storage. i.e logs out user.
     */
    static removeToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }

    /**
     * returns whether browser has a token in it's storage
     */
    static hasToken() {
        return JwtProvider.getToken() != null;
    }

    /**
     * Saves the token to the browser storage
     * @param token
     */
    static saveToken(token) {
        localStorage.setItem('token', token);
    }

    static saveUserName(username) {
        localStorage.setItem('username', username)
    }

    static getUserName() {
        return localStorage.getItem('username')
    }

    /**
     * returns the token
     * @returns {any}
     */
    static getToken() {
        return localStorage.getItem('token')
    }
}