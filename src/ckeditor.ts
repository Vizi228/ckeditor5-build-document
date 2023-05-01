/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import DecoupledEditorBase from "@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor";

import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import {
  FontSize,
  FontFamily,
  FontColor,
  FontBackgroundColor,
} from "@ckeditor/ckeditor5-font";
import { UploadAdapter } from "@ckeditor/ckeditor5-adapter-ckfinder";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from "@ckeditor/ckeditor5-basic-styles";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import { CKBox } from "@ckeditor/ckeditor5-ckbox";
import { CKFinder } from "@ckeditor/ckeditor5-ckfinder";
import { EasyImage } from "@ckeditor/ckeditor5-easy-image";
import { Heading } from "@ckeditor/ckeditor5-heading";
import {
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  PictureEditing,
} from "@ckeditor/ckeditor5-image";
import { Indent, IndentBlock } from "@ckeditor/ckeditor5-indent";
import { Link } from "@ckeditor/ckeditor5-link";
import { List, ListProperties } from "@ckeditor/ckeditor5-list";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";
import { TextTransformation } from "@ckeditor/ckeditor5-typing";
import { CloudServices } from "@ckeditor/ckeditor5-cloud-services";
import { Placeholder } from "./plugins/placeholder/src";

export default class DecoupledEditor extends DecoupledEditorBase {
  public static override builtinPlugins = [
    Essentials,
    Alignment,
    FontSize,
    FontFamily,
    FontColor,
    FontBackgroundColor,
    UploadAdapter,
    Autoformat,
    Bold,
    Italic,
    Strikethrough,
    Underline,
    BlockQuote,
    CKBox,
    CKFinder,
    CloudServices,
    EasyImage,
    Heading,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Link,
    List,
    ListProperties,
    Paragraph,
    PasteFromOffice,
    PictureEditing,
    Table,
    TableToolbar,
    TextTransformation,
    Placeholder,
  ];

  public static override defaultConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "placeholder",
        "|",
        "fontfamily",
        "fontsize",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "uploadImage",
        "insertTable",
        "blockQuote",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
      ],
    },
    placeholderConfig: {
      types: [
        {
          name: "Назва профілю",
          propertyName: "username",
          description: "Назва профілю в Таксер",
        },
        { name: "ІПН", propertyName: "IPN", description: "Ваш ІПН в Таксер" },
        {
          name: "Адреса",
          propertyName: "address",
          description: "Адреса вказана в Таксер",
        },
        {
          name: "IBAN",
          propertyName: "IBAN",
          description: "IBAN вашого рахунку",
        },
        {
          name: "Платник податків",
          propertyName: "isPayable",
          description: "Чи є ви платником податків",
        },
        {
          name: "Одержувач",
          propertyName: "receiver",
          description: "Одержувач цього документа",
        },
        {
          name: "Усього",
          propertyName: "total",
          description: "Загальна сума номенклатури",
        },
      ],
    },
    image: {
      resizeUnit: "px" as const,
      toolbar: [
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "toggleImageCaption",
        "imageTextAlternative",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: "uk",
  };
}
