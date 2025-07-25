import { expect, test } from "vitest";

test("var:declaration-list renders correctly with const", () => {
  const v = (
    <var:declaration-list type="const">
      <var:declaration>
        <ident name="x" />
        <t:primitive type="string" />
        <l:string value="Hello" />
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe('const x:string="Hello"');
});

test("var:declaration-list renders correctly with let", () => {
  const v = (
    <var:declaration-list type="let">
      <var:declaration>
        <ident name="x" />
        <t:primitive type="string" />
        <l:string value="Hello" />
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe('let x:string="Hello"');
});

test("var:declaration-list renders correctly with var", () => {
  const v = (
    <var:declaration-list type="var">
      <var:declaration>
        <ident name="x" />
        <t:primitive type="string" />
        <l:string value="Hello" />
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe('var x:string="Hello"');
});

test("var:declaration-list renders correctly with a multiple declarations", () => {
  const v = (
    <var:declaration-list type="const">
      <var:declaration>
        <ident name="x" />
        <t:primitive type="string" />
        <l:string value="Hello" />
      </var:declaration>
      <var:declaration>
        <ident name="y" />
        <t:primitive type="number" />
        <expr:as>
          <l:number value={10} />
          <t:primitive type="number" />
        </expr:as>
      </var:declaration>
      <var:declaration>
        <ident name="z" />
        <l:object />
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe('const x:string="Hello",y:number=10 as number,z={}');
});

test("var:declaration-list renders correctly with non-identifier bindings", () => {
  const v = (
    <var:declaration-list type="const">
      <var:declaration>
        <bind:object>
          <ident name="zz" />
          <bind:object-elem mode="initializer">
            <ident name="qq" />
            <l:number value={10} />
          </bind:object-elem>
        </bind:object>
        <l:object>
          <l:object-prop>
            <ident name="zz" />
            <l:string value="test" />
          </l:object-prop>
          <l:object-prop>
            <ident name="qq" />
            <l:number value={30} />
          </l:object-prop>
        </l:object>
      </var:declaration>
      <var:declaration>
        <bind:array>
          <ident name="a1" />
          <bind:array-elem>
            <ident name="a2" />
            <l:number value={10} />
          </bind:array-elem>
        </bind:array>
        <l:array>
          <l:string value="test" />
          <l:number value={30} />
        </l:array>
      </var:declaration>
    </var:declaration-list>
  );
  expect(v.render()).toBe(
    'const {zz,qq=10}={zz:"test",qq:30},[a1,a2=10]=["test",30]'
  );
});
