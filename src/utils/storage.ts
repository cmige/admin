// @ts-ignore
import Cookies from "js-cookie";

export const getLayoutModel = (): string => {
    const LayoutModel = localStorage.getItem("layoutModel");
    if (!LayoutModel) localStorage.setItem("layoutModel", "default");
    return localStorage.getItem("layoutModel") as string;
};

export const setLayoutModel = (model: string) => {
    localStorage.removeItem("layoutModel");
    localStorage.setItem("layoutModel", model);
};


export const Local = {
    get: (key: string) => {
        return JSON.parse(localStorage.getItem(key) as any);
    },

    set: (key: string, val: any) => {
        localStorage.setItem(key, JSON.stringify(val));
    },

    remove: (key: string) => {
        localStorage.removeItem(key);
    },

    clear: () => {
        localStorage.clear();
    }
};

export const Cookie = {
    get: (key: string) => {
        if (key === "token") return Cookies.get(key);
    },
    set: (key: string, val: any, expires?: number) => {
        if (key === "token") return Cookies.set(key, val, {expires: expires});
    },
    remove: (key: string) => {
        if (key === "token") return Cookies.remove(key);
    }
};

