import { validateFields } from "../src/utils/check_fields";

test("should pass", () => {
  expect(true).toEqual(true);
});

describe("UTILS validateFields()", () => {
  test("should return false because missing fields", () => {
    const myBook = {
      title: "Un libro de prueba",
      year: 2021,
      cover_path: "cover_path",
    };

    expect(validateFields(myBook)).toBe(false);
  });

  test("should return true because missing fields", () => {
    const myBook = {
      title: "Un libro de prueba",
      author: "Autor de prueba",
      year: 2021,
      cover_path: "cover_path",
    };

    expect(validateFields(myBook)).toBe(true);
  });
});
