const _type_primitives = [
  "string",
  "number",
  "boolean",
  "any",
  "unknown",
  "never",
] as const;

export type TypePrimitiveName = (typeof _type_primitives)[number];

const _properties = ["var-name", "fun-name", "type"] as const;

export type PassthroughElementTypeName = (typeof _properties)[number];
export type PassthroughElementType = `p:${PassthroughElementTypeName}`;

const _literals = [
  "boolean",
  "number",
  "string",
  "regex",
  "bigint",
  "object",
  "array",
] as const;

export type LiteralElementTypeName = (typeof _literals)[number];
export type LiteralElementType = `l:${LiteralElementTypeName}`;

const _literal_object_nodes = ["prop", "getter", "setter"] as const;

export type LiteralObjectNodeTypeName = (typeof _literal_object_nodes)[number];
export type LiteralObjectNodeType = `l:object-${LiteralObjectNodeTypeName}`;

const _standalone_exressions = [
  "template",
  "function",
  "statement",
  "parens",
  "prop-access",
  "elem-access",
  "cond",
] as const;

const _binary_expressions = ["as", "binary"] as const;

const _unary_expressions = [
  "not",
  "await",
  "typeof",
  "call",
  "non-null",
  "yield_",
] as const;

export type UnaryExpressionTypeName = (typeof _unary_expressions)[number];
export type UnaryExpressionType = `expr:${UnaryExpressionTypeName}`;

export type BinaryExpressionTypeName = (typeof _binary_expressions)[number];
export type BinaryExpressionType = `expr:${BinaryExpressionTypeName}`;

export type StandaloneExpressionTypeName =
  (typeof _standalone_exressions)[number];
export type StandaloneExpressionType = `expr:${StandaloneExpressionTypeName}`;

export type ExpressionTypeName =
  | UnaryExpressionTypeName
  | BinaryExpressionTypeName
  | StandaloneExpressionTypeName;

export type ExpressionType =
  | UnaryExpressionType
  | BinaryExpressionType
  | StandaloneExpressionType;

const _types = [
  "primitive",
  "ref",
  "cond",
  "indexed",
  "param",
  "predicate",
] as const;

export type TypeElementTypeName = (typeof _types)[number];
export type TypeElementType = `t:${TypeElementTypeName}`;

export type ElementType =
  | "ident"
  | "text"
  | "block"
  | "arrow-function"
  | "function-declaration"
  | "if-statement"
  | "param"
  | "var:statement"
  | "var:declaration"
  | "var:declaration-list"
  | "var:declaration-name"
  | "bind:array"
  | "bind:array-elem"
  | "bind:object"
  | "bind:object-elem"
  | "exact-literal"
  | LiteralObjectNodeType
  | ExpressionType
  | TypeElementType
  | LiteralElementType
  | PassthroughElementType;

export const STANDLONE_EXPRESSION_TYPES: readonly StandaloneExpressionType[] = [
  "expr:elem-access",
  "expr:function",
  "expr:parens",
  "expr:prop-access",
  "expr:template",
  "expr:cond",
];

export function isStandaloneExpressionType(
  v: string
): v is StandaloneExpressionType {
  return STANDLONE_EXPRESSION_TYPES.includes(v as StandaloneExpressionType);
}

export const BINARY_EXPRESSION_TYPES: readonly BinaryExpressionType[] = [
  "expr:as",
  "expr:binary",
];

export function isBinaryExpressionType(v: string): v is BinaryExpressionType {
  return BINARY_EXPRESSION_TYPES.includes(v as BinaryExpressionType);
}

export const UNARY_EXPRESSION_TYPES: readonly UnaryExpressionType[] = [
  "expr:not",
  "expr:await",
  "expr:call",
  "expr:typeof",
  "expr:non-null",
  "expr:yield_",
];

export function isUnaryExpressionType(v: string): v is UnaryExpressionType {
  return UNARY_EXPRESSION_TYPES.includes(v as UnaryExpressionType);
}

export const LITERAL_PRIMITIVE_TYPES: readonly LiteralElementType[] = [
  "l:number",
  "l:boolean",
  "l:string",
  "l:bigint",
];

export const LITERAL_TYPES: readonly LiteralElementType[] = [
  ...LITERAL_PRIMITIVE_TYPES,
  "l:regex",
  "l:object",
  "l:array",
];

export const PASSTHROUGH_TYPES: readonly PassthroughElementType[] = [
  "p:fun-name",
  "p:var-name",
  "p:type",
];

export const TYPE_TYPES: readonly TypeElementType[] = [
  "t:primitive",
  "t:ref",
  "t:cond",
  "t:indexed",
  // t:param is only used in functions so it shouldnt be included here generally.
  // t:predicate is only used as a function return type, so is not included here generally.
];

export const BLOCK_STATEMENTS_AND_DECLARATIONS: readonly ElementType[] = [
  "var:statement",
  "function-declaration",
  "if-statement",
  "expr:statement",
];

export function omitFrom(
  t: ElementType[] | readonly ElementType[],
  types: ElementType | ElementType[]
) {
  const omit_types = Array.isArray(types) ? types : [types];
  return t.filter((v) => !omit_types.includes(v));
}

export function isTypeType(v: string) {
  return TYPE_TYPES.includes(v as TypeElementType);
}

export const EXPRESSION_OR_LITERAL_TYPES: readonly ElementType[] = [
  ...BINARY_EXPRESSION_TYPES,
  ...UNARY_EXPRESSION_TYPES,
  ...STANDLONE_EXPRESSION_TYPES,
  ...LITERAL_TYPES,
];

export const VALUE_TYPES = [
  ...EXPRESSION_OR_LITERAL_TYPES,
  "ident",
  "arrow-function",
] as const;

export const ANY_TYPE = [...EXPRESSION_OR_LITERAL_TYPES, ...TYPE_TYPES];

export type AstNode = {
  type: ElementType;
  docs?: AstNode;
  props: any; // TODO: Make this more accurate
  render: () => string;
};

export type Stringable = string | { toString: (...args: any) => string };

export interface JSXCreationInterface {
  [K: string]: any;
  children?: AstNode;
}

export interface JSXSCreationInterface {
  [K: string]: any;
  children?: AstNode[];
}

export type WithChildren<T> = T & {
  children?: AstNode[] | any;
};
