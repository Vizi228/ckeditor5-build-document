import PlaceholderEditing from "./placeholderediting";
import PlaceholderUi from "./placeholderui";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class Placeholder extends Plugin {
  static get requires() {
    return [PlaceholderEditing, PlaceholderUi];
  }
}
