import axios from "axios";

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
        this.tokenName = "token";
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }
    async request({ endpoint, method = `GET`, data = {} }) {
        const url = `${this.remoteHostUrl}/${endpoint}`;

        const headers = {
            "Content-Type": "application/json",
            Authorization: this.token ? `Bearer ${this.token}` : "",
        };

        try {
            const res = await axios({ url, method, data, headers });
            return { data: res.data, error: null };
        } catch (error) {
            console.error("APIclient.makeRequest.error:");
            console.error({ errorResponse: error.response });
            const message = error?.response?.data?.error?.message;
            return { data: null, error: message || String(error) };
        }
    }

    async getUserFromToken() {
        return await this.request({ endpoint: `users/me`, method: `GET` });
    }

    async registerUser(credentials) {
        // console.log(credentials);
        return await this.request({
            endpoint: "users/signup",
            method: "POST",
            data: credentials,
        });
    }

    async checkUsername(username) {
        return await this.request({
            endpoint: `users/checkUsernames/${username}`,
            method: `GET`,
        });
    }

    async checkEmail(email) {
        return await this.request({
            endpoint: `users/checkEmails/${email}`,
            method: `GET`,
        });
    }

    async getDates(tags = [], sorting = "disabled", page = 1, limit = 12) {
        const queryString = new URLSearchParams();

        if (tags.length > 0) {
            queryString.set("tags", tags.join(","));
        }
        if (sorting !== "disabled") {
            queryString.set("sorting", sorting);
        }

        queryString.set("page", page);
        queryString.set("limit", limit);

        return await this.request({
            endpoint: `dates?${queryString.toString()}`,
            method: `GET`,
        });
    }

    async getLikedDates(userId) {
        const queryString = new URLSearchParams();
        queryString.set("user", userId);
        return await this.request({
            endpoint: `dates/liked?${queryString.toString()}`,
            method: `GET`,
        });
    }

    async getUserDates(userId) {
        const queryString = new URLSearchParams();
        queryString.set("user", userId);
        return await this.request({
            endpoint: `dates/user?${queryString.toString()}`,
            method: `GET`,
        });
    }

    async getEvents(searchParam = "") {
        return await this.request({
            endpoint: `dates/api/${searchParam}`,
            method: `GET`,
        });
    }

    async createDate(date) {
        return await this.request({
            endpoint: `dates`,
            method: `POST`,
            data: date,
        });
    }

    async removeDate(userId, dateId) {
        return await this.request({
            endpoint: `dates/${userId}/${dateId}`,
            method: `DELETE`,
        });
    }

    async patchDate(userId, dateId, dateData) {
        // console.log(dateData)
        return await this.request({
            endpoint: `dates/${userId}/${dateId}`,
            method: `PATCH`,
            data: dateData,
        });
    }

    async likeDate(userId, dateId) {
        return await this.request({
            endpoint: `users/user/${userId}/like/${dateId}`,
            method: `POST`,
        });
    }

    async unlikeDate(userId, dateId) {
        return await this.request({
            endpoint: `users/user/${userId}/like/${dateId}`,
            method: `DELETE`,
        });
    }

    async postComment(userId, dateId, comment) {
        return await this.request({
            endpoint: `comments/${userId}/${dateId}`,
            method: `POST`,
            data: { comment },
        });
    }

    async deleteComment(userId, dateId, timeStamp) {
        return await this.request({
            endpoint: `comments/${userId}/${dateId}/${timeStamp}`,
            method: `DELETE`,
        });
    }
}

const API = new ApiClient(import.meta.env.VITE_API_URL); // A little unsecure but whatever
export default API;
