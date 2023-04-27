import Command from "@ckeditor/ckeditor5-core/src/command";

export default class PlaceholderCommand extends Command {
  execute({ name, propertyName }) {
    const editor = this.editor;
    const selection = editor.model.document.selection;

    editor.model.change((writer) => {
      const placeholder = writer.createElement("placeholder", {
        ...Object.fromEntries(selection.getAttributes()),
        name,
        propertyName,
      });
      editor.model.insertObject(placeholder, null, null, {
        setSelection: "on",
      });
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;

    this.isEnabled = model.schema.checkChild(
      selection.focus.parent,
      "placeholder"
    );
  }
}
