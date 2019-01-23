import "./configuration";
import React from "react";

import Movie from "../components/Movie";

import { mount } from "enzyme";

describe("<Movie /> . ", () => {
    test("Missing props", () => {
        const update = mount(<Movie />);
        expect(update.html()).toBe(null);
    })
    test("Poster rendered", () => {
        const item = {
            Poster: 'poster-link',
            imdbID: "12345",
            Title: "title",
            Year: "1999"
        }
        const update = mount(<Movie item={item}/>);
        expect(update.find("img").length).toEqual(1);
        expect(update.find("img").prop("src")).toEqual(item.Poster);
    })
    test("BrokenImage rendered", () => {
        const item = {
            Poster: 'N/A',
            imdbID: "12345",
            Title: "title",
            Year: "1999"
        }
        const update = mount(<Movie item={item}/>);
        expect(update.find("img").length).toEqual(0);
    })
})