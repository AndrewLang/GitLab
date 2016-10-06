
import { Injectable, EventEmitter } from '@angular/core';
import {KnownCommandNames}          from './KnownCommandNames';
import * as Common                  from '../../common/index';

declare var tinymce: any;

@Injectable()
export class HtmlEditorService {
    
    private mContent: string;
    ContentChanged: EventEmitter<string> = new EventEmitter<string>();

    get Content(): string {
        return this.mContent;
    }
    set Content(value: string) {
        if (value != this.mContent) {
            this.mContent = value;
            this.ContentChanged.emit(value);
        }
    }

    InitializeEditor(selector: string): void {
        let self = this;
        tinymce.init({
            selector: selector,
            inline: true,
            fixed_toolbar_container: "div#textEditorToolbar",
            theme: 'modern',
            statusbar: false,
            // menu: {
            //     file: { title: 'File', items: 'newdocument | print' },
            //     edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall ' },
            //     format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat' },
            //     insert: { title: 'Insert', items: 'link image media | emoticons codesample hr importcss insertdatetime | inserttable tableprops deletetable | cell row column | table template' },
            //     view: { title: 'View', items: 'visualaid visualblocks' },
            //     help: { title: 'Help', items: 'print' }
            // },
            codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
                { text: 'PHP', value: 'php' },
                { text: 'Ruby', value: 'ruby' },
                { text: 'Python', value: 'python' },
                { text: 'Java', value: 'java' },
                { text: 'C', value: 'c' },
                { text: 'C#', value: 'csharp' },
                { text: 'C++', value: 'cpp' }
            ],
            menubar: false, // 'file edit format insert view help',
            plugins: [
                // fullscreen wordcount save
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace visualblocks visualchars code ',
                'insertdatetime media nonbreaking table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools codesample bbcode',
                'importcss spellchecker'
            ],
            toolbar1: 'undo redo | cut copy paste pastetext | fontsizeselect fontselect | bold italic underline strikethrough superscript subscript blockquote | forecolor backcolor ',
            toolbar2: 'alignleft aligncenter alignright alignjustify | bullist numlist | indent outdent | code searchreplace | link image media |  emoticons codesample hr importcss insertdatetime table',
            image_advtab: true,
            inline_styles: false,
            formats: {
                underline: { inline: 'u', exact: true },
                strikethrough: { inline: 'strike' }
            },
            block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3',            
            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
            content_css: [
                //'//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                'src/assets/css/editor.basic.css'
            ],
            // templates: [
            //     { title: 'Some title 1', description: 'Some desc 1', content: 'My content' },
            //     { title: 'Some title 2', description: 'Some desc 2', url: 'development.html' }
            // ],
            textpattern_patterns: [
                { start: '*', end: '*', format: 'italic' },
                { start: '**', end: '**', format: 'bold' },
                { start: '#', format: 'h1' },
                { start: '##', format: 'h2' },
                { start: '###', format: 'h3' },
                { start: '####', format: 'h4' },
                { start: '#####', format: 'h5' },
                { start: '######', format: 'h6' },
                { start: '1. ', cmd: 'InsertOrderedList' },
                { start: '* ', cmd: 'InsertUnorderedList' },
                { start: '- ', cmd: 'InsertUnorderedList' }
            ],
            init_instance_callback: function (editor) {
                console.log("init callback");
                tinymce.activeEditor.focus();
            },
            setup: function (editor) {
                editor.on('init', function (e) {
                    console.log("html editor initialized.")
                });
                editor.on('blur', function (e) {
                    throw new Error('Tinymce hack workaround');
                });
                editor.on('change', function (e) {
                    self.Content = editor.getContent({ format: 'raw' });
                    console.log("HTML editor content changed.");
                });
            }
        });
    }
    UpdateContent(): void {
        this.Content = tinymce.activeEditor.getContent({ format: 'raw' });
    }
    ToggleBold(): void {
        this.InvokeEditorCommand(KnownCommandNames.Bold);
    }
    ToggleItalic(): void {
        this.InvokeEditorCommand(KnownCommandNames.Italic);
    }
    ToggleUnderline(): void {
        this.InvokeEditorCommand(KnownCommandNames.Underline);
    }
    ToggleStrikethrough(): void {
        this.InvokeEditorCommand(KnownCommandNames.Strikethrough);
    }
    Superscript(): void {
        this.InvokeEditorCommand(KnownCommandNames.Superscript);
    }
    Subscript(): void {
        this.InvokeEditorCommand(KnownCommandNames.Subscript);
    }
    Cut(): void {
        this.InvokeEditorCommand(KnownCommandNames.Cut);
    }
    Copy(): void {
        this.InvokeEditorCommand(KnownCommandNames.Copy);
    }
    Paste(): void {
        this.InvokeEditorCommand(KnownCommandNames.Paste);
    }
    Unlink(): void {
        this.InvokeEditorCommand(KnownCommandNames.Unlink);
    }
    JustifyLeft(): void {
        this.InvokeEditorCommand(KnownCommandNames.JustifyLeft);
    }
    JustifyCenter(): void {
        this.InvokeEditorCommand(KnownCommandNames.JustifyCenter);
    }
    JustifyRight(): void {
        this.InvokeEditorCommand(KnownCommandNames.JustifyRight);
    }
    JustifyFull(): void {
        this.InvokeEditorCommand(KnownCommandNames.JustifyFull);
    }
    JustifyNone(): void {
        this.InvokeEditorCommand(KnownCommandNames.JustifyNone);
    }
    InsertUnorderedList(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertUnorderedList);
    }
    InsertOrderedList(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertOrderedList);
    }
    InsertEmoticon():void{
        this.InvokeEditorCommand(KnownCommandNames.InsertEmoticons, true);
    }
    ForeColor(): void {
        this.InvokeEditorCommand(KnownCommandNames.ForeColor);
    }
    HiliteCollor(): void {
        this.InvokeEditorCommand(KnownCommandNames.HiliteColor);
    }
    FontName(): void {
        this.InvokeEditorCommand(KnownCommandNames.FontName);
    }
    FontSize(): void {
        this.InvokeEditorCommand(KnownCommandNames.FontSize);
    }
    RemoveFormat(): void {
        this.InvokeEditorCommand(KnownCommandNames.RemoveFormat);
    }
    BlockQuote(): void {
        this.InvokeEditorCommand(KnownCommandNames.BlockQuote);
    }
    FormatBlock(): void {
        this.InvokeEditorCommand(KnownCommandNames.FormatBlock);
    }
    InsertContent(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertContent);
    }
    ToggleFormat(): void {
        this.InvokeEditorCommand(KnownCommandNames.ToggleFormat);
    }
    SetContent(): void {
        this.InvokeEditorCommand(KnownCommandNames.SetContent);
    }
    Indent(): void {
        this.InvokeEditorCommand(KnownCommandNames.Indent);
    }
    Outdent(): void {
        this.InvokeEditorCommand(KnownCommandNames.Outdent);
    }
    InsertHorizontalRule(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertHorizontalRule);
    }
    ToggleVisualAid(): void {
        this.InvokeEditorCommand(KnownCommandNames.VisualAid);
    }
    InsertLink(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertLink, true);
    }
    SelectAll(): void {
        this.InvokeEditorCommand(KnownCommandNames.SelectAll);
    }
    Delete(): void {
        this.InvokeEditorCommand(KnownCommandNames.Delete);
    }
    NewDocument(): void {
        this.InvokeEditorCommand(KnownCommandNames.NewDocument);
    }
    Undo(): void {
        this.InvokeEditorCommand(KnownCommandNames.Undo);
    }
    Redo(): void {
        this.InvokeEditorCommand(KnownCommandNames.Redo);
    }
    AutoResize(): void {
        this.InvokeEditorCommand(KnownCommandNames.AutoResize);
    }
    ShowCharmap(): void {
        this.InvokeEditorCommand(KnownCommandNames.ShowCharmap);
    }
    CodeEditor(): void {
        this.InvokeEditorCommand(KnownCommandNames.CodeEditor);
    }
    DirectionLTR(): void {
        this.InvokeEditorCommand(KnownCommandNames.DirectionLTR);
    }
    DirectionRTL(): void {
        this.InvokeEditorCommand(KnownCommandNames.DirectionRTL);
    }
    FullPageProperties(): void {
        this.InvokeEditorCommand(KnownCommandNames.FullPageProperties);
    }
    FullScreen(): void {
        this.InvokeEditorCommand(KnownCommandNames.FullScreen);
    }
    InsertImage(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertImage);
    }
    InsertDate(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertDate);
    }
    InsertTime(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertTime);
    }
    InsertDefinitionList(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertDefinitionList);
    }
    InsertCode():void{
        this.InvokeEditorCommand(KnownCommandNames.InsertCodeSample);
    }
    NonBreaking(): void {
        this.InvokeEditorCommand(KnownCommandNames.NonBreaking);
    }
    InsertPageBreak(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertPageBreak);
    }
    Preview(): void {
        this.InvokeEditorCommand(KnownCommandNames.Preview);
    }
    Print(): void {
        this.InvokeEditorCommand(KnownCommandNames.Print, true);
    }
    Save(): void {
        this.InvokeEditorCommand(KnownCommandNames.Save);
    }
    SearchReplace(): void {
        this.InvokeEditorCommand(KnownCommandNames.SearchReplace);
    }
    Spellcheck(): void {
        this.InvokeEditorCommand(KnownCommandNames.Spellcheck);
    }
    InsertTemplate(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertTemplate);
    }
    ToggleVisualBlocks(): void {
        this.InvokeEditorCommand(KnownCommandNames.VisualBlocks);
    }
    ToggleVisualChars(): void {
        this.InvokeEditorCommand(KnownCommandNames.VisualChars);
    }
    InsertMedia(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertVideo);
    }
    InsertAnchor(): void {
        this.InvokeEditorCommand(KnownCommandNames.Anchor);
    }
    EditImage(): void {
        this.InvokeEditorCommand(KnownCommandNames.EditImage);
    }
    InsertTable(): void {
        this.InvokeEditorCommand(KnownCommandNames.InsertTable);
    }
    TableSplitCells(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableSplitCells);
    }
    TableMergeCells(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableMergeCells);
    }
    TableInsertRowBefore(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableInsertRowBefore);
    }
    TableInsertRowAfter(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableInsertRowAfter);
    }
    TableInsertColBefore(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableInsertColBefore);
    }
    TableInsertColAfter(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableInsertColAfter);
    }
    TableDeleteCol(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableDeleteCol);
    }
    TableDeleteRow(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableDeleteRow);
    }
    TableCutRow(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableCutRow);
    }
    TableCopyRow(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableCopyRow);
    }
    TablePasteRowBefore(): void {
        this.InvokeEditorCommand(KnownCommandNames.TablePasteRowBefore);
    }
    TablePasteRowAfter(): void {
        this.InvokeEditorCommand(KnownCommandNames.TablePasteRowAfter);
    }
    TableDelete(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableDelete);
    }
    TableRowProps(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableRowProps);
    }
    TableCellProps(): void {
        this.InvokeEditorCommand(KnownCommandNames.TableCellProps);
    }

    private InvokeEditorCommand(name: string, showUi?: boolean, value?: any, args?: any): void {
        console.log("Invoke Tinymce command: " + name + " showUI: " + showUi + " value: " + value + " args: " + args);

        let editor = tinymce.activeEditor;
        editor.execCommand(name, showUi, value, args);
    }
}