export class Task {
  id!: number;
  title!: string;
  text!: string;
  isTextEdited?: boolean = false;
  isTitleEdited?: boolean = false;
}
