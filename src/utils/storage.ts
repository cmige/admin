export const getLayoutModel = (): string => {
    const LayoutModel = localStorage.getItem("layoutModel");
    if (!LayoutModel) localStorage.setItem("layoutModel", "default");
    return localStorage.getItem("layoutModel") as string;
};

export const setLayoutModel = (model: string) => {
    localStorage.removeItem("layoutModel");
    localStorage.setItem("layoutModel", model);
};
