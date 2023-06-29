import { test } from "./utils.ts";

Deno.test("For tag (number)", async () => {
  await test({
    template: `
    {{ for number of 3 }}{{ number }}{{ /for }}
    `,
    expected: "123",
  });

  await test({
    template: `
    {{ for key, number of 3 }}{{number}}({{key}}) - {{ /for }}
    `,
    expected: "1(0) - 2(1) - 3(2) -",
  });
});

Deno.test("For tag (string)", async () => {
  await test({
    template: `
    {{ for name of "hello" }}{{ name }}-{{ /for }}
    `,
    expected: "h-e-l-l-o-",
  });

  await test({
    template: `
    {{ for key, name of "hello" }}{{name}}({{key}})-{{ /for }}
    `,
    expected: "h(0)-e(1)-l(2)-l(3)-o(4)-",
  });
});

Deno.test("For tag (array)", async () => {
  await test({
    template: `
    {{ for name of [1, 2, 3] }}{{ name }}-{{ /for }}
    `,
    expected: "1-2-3-",
  });

  await test({
    template: `
    {{ for key, name of [1, 2, 3, 4] }}{{name}}({{key}})-{{ /for }}
    `,
    expected: "1(0)-2(1)-3(2)-4(3)-",
  });
});

Deno.test("For tag (object)", async () => {
  await test({
    template: `
    {{ for name of { one: "1", two: "2" } }}{{ name }}-{{ /for }}
    `,
    expected: "1-2-",
  });

  await test({
    template: `
    {{ for name of {
      one: "1",
      two: "2"
    } }}{{ name }}-{{ /for }}
    `,
    expected: "1-2-",
  });

  await test({
    template: `
    {{ for key, name of { one: "1", two: "2" } }}{{name}}({{key}})-{{ /for }}
    `,
    expected: "1(one)-2(two)-",
  });
});

Deno.test("For tag (function)", async () => {
  await test({
    template: `
    {{ for name of items }}{{ name }}-{{ /for }}
    `,
    expected: "1-2-",
    data: {
      items: () => ({ one: "1", two: "2" }),
    },
  });

  await test({
    template: `
    {{ for key, name of items }}{{name}}({{key}})-{{ /for }}
    `,
    expected: "1(one)-2(two)-",
    data: {
      items: () => ({ one: "1", two: "2" }),
    },
  });
});

Deno.test("For tag (empty)", async () => {
  await test({
    template: `
    {{ for name of null }}{{ name }}-{{ /for }}
    `,
    expected: "",
  });

  await test({
    template: `
    {{ for key, name of null }}{{name}}({{key}})-{{ /for }}
    `,
    expected: "",
  });

  await test({
    template: `
    {{ for name of undefined }}{{ name }}-{{ /for }}
    `,
    expected: "",
  });

  await test({
    template: `
    {{ for key, name of undefined }}{{name}}({{key}})-{{ /for }}
    `,
    expected: "",
  });
});

Deno.test("For tag (with filters)", async () => {
  await test({
    template: `
    {{ for name of [1, 2, 3] |> double }}{{ name }}-{{ /for }}
    `,
    expected: "2-4-6-",
    init(env) {
      env.filters.double = (values: number[]) =>
        values.map((value) => value * 2);
    },
  });
  await test({
    template: `
    {{ for name of [1, 2, 3] |> filter(n => n === 2) }}{{ name }}-{{ /for }}
    `,
    expected: "2-",
    init(env) {
      env.filters.double = (values: number[]) =>
        values.map((value) => value * 2);
    },
  });
});
