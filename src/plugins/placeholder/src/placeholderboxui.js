import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import {
  addListToDropdown,
  createDropdown,
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";

import Collection from "@ckeditor/ckeditor5-utils/src/collection";
import Model from "@ckeditor/ckeditor5-ui/src/model";

export default class PlaceholderUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;
    const placeholderNames = editor.config.get("placeholderConfig.types");

    editor.ui.componentFactory.add("placeholder", (locale) => {
      const dropdownView = createDropdown(locale);

      addListToDropdown(
        dropdownView,
        getDropdownItemsDefinitions(placeholderNames)
      );

      dropdownView.buttonView.set({
        label: t("Змінні"),
        tooltip: true,
        withText: true,
      });

      const command = editor.commands.get("placeholder");
      dropdownView.bind("isEnabled").to(command);

      this.listenTo(dropdownView, "execute", (evt) => {
        editor.execute("placeholder", { ...evt.source.commandParam });
        editor.editing.view.focus();
      });

      return dropdownView;
    });
  }
}

function getDropdownItemsDefinitions(placeholderNames) {
  const itemDefinitions = new Collection();

  for (const { name, propertyName } of placeholderNames) {
    const definition = {
      type: "button",
      model: new Model({
        commandParam: { name, propertyName },
        label: name,
        withText: true,
      }),
    };
    itemDefinitions.add(definition);
  }

  return itemDefinitions;
}
