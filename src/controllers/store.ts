import { writable } from "svelte/store";

export const mainScene = writable()
export const highlighter = writable()
export const nav_points = writable<Array<any>>()
export const shops_list = writable<Array<any>>()
export const selected_point = writable();
export const selected_shop = writable();
