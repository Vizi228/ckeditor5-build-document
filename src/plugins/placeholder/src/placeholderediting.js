import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import {
  toWidget,
  viewToModelPositionOutsideModelElement,
} from "@ckeditor/ckeditor5-widget/src/utils";
import Widget from "@ckeditor/ckeditor5-widget/src/widget";
import PlaceholderCommand from "./placeholdercommand";

export default class PlaceholderEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();
    this.editor.commands.add(
      "placeholder",
      new PlaceholderCommand(this.editor)
    );
    this.editor.editing.mapper.on(
      "viewToModelPosition",
      viewToModelPositionOutsideModelElement(this.editor.model, (viewElement) =>
        viewElement.hasClass("placeholder")
      )
    );
    this.editor.editing.view.document.on("keydown", (evt, data) => {
      const selection = this.editor.model.document.selection;
      if (selection.getSelectedElement()?.name === "placeholder") {
        data.domEvent.preventDefault();
      }
    });
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register("placeholder", {
      inheritAllFrom: "$inlineObject",
      allowAttributes: ["name", "propertyName", "multiple"],
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("upcast").elementToElement({
      model: (viewElement, { writer: modelWriter }) => {
        const name = viewElement.getChild(0).data;
        const propertyName = viewElement.getAttribute("name");
        const multiple = viewElement.getAttribute("multiple");
        return modelWriter.createElement("placeholder", {
          name,
          propertyName,
          multiple,
        });
      },
      view: {
        name: "span",
        classes: ["placeholder"],
      },
    });
    conversion.for("dataDowncast").elementToElement({
      model: "placeholder",
      view: (modelElement, { writer: viewWriter }) =>
        createPlaceholderElement(modelElement, viewWriter),
    });
    conversion.for("editingDowncast").elementToElement({
      model: "placeholder",
      view: (modelElement, { writer: viewWriter }) => {
        const element = createPlaceholderElement(modelElement, viewWriter);
        return toWidget(element, viewWriter, { label: "placeholder widget" });
      },
    });

    const createPlaceholderElement = (modelElement, viewWriter) => {
      const name = modelElement.getAttribute("name");
      const multiple = modelElement.getAttribute("multiple");
      const propertyName = modelElement.getAttribute("propertyName");
      const element = viewWriter.createContainerElement("span", {
        class: "placeholder",
        name: propertyName,
        multiple,
      });
      const text = viewWriter.createText(name);
      viewWriter.insert(viewWriter.createPositionAt(element, 0), text);
      return element;
    };
  }
}
