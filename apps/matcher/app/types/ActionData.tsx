export interface Field {
  name: string;
  content: string;
}

export interface ActionData {
  formError?: string;
  fieldErrors?: {
    name: string | undefined;
    content: string | undefined;
  };
  fields?: Field[];
}
