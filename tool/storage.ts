import wallet from "@/wallet";

function setPrefix() {
    const address = wallet.address;
    return address.slice(8, 12);
}

export const clearLocalStorage = () => {
    localStorage.clear();
};

// token
export const setLocalToken = (str: string) => {
    const prefix = setPrefix();
    const name = prefix + "t";
    return localStorage.setItem(name, str);
};

// token
export const getLocalToken = () => {
    const prefix = setPrefix();
    const name = prefix + "t";
    return localStorage.getItem(name);
};
