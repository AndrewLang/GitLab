import { Injectable}                from '@angular/core';
import * as Common                  from '../../common/index';
import {KnownCommandNames}          from './KnownCommandNames';
import {CommandInitializer}         from './ICommandInitializer';
import {HtmlEditorService}          from './HtmlEditorService';

@Injectable()
export class EditorCommandInitializer extends CommandInitializer {
    constructor(commandRepository: Common.CommandRepository,
        private htmlEditorService: HtmlEditorService) {
        super(commandRepository);
    }

    InitializeCommands(): void {
        console.log("Start register command.");

        this.RegisterCommand(KnownCommandNames.Bold, (param) => { this.htmlEditorService.ToggleBold(); });
        this.RegisterCommand(KnownCommandNames.Italic, (param) => { this.htmlEditorService.ToggleItalic(); });
        this.RegisterCommand(KnownCommandNames.Underline, (param) => { this.htmlEditorService.ToggleUnderline(); });
        this.RegisterCommand(KnownCommandNames.Strikethrough, (param) => { this.htmlEditorService.ToggleStrikethrough(); });
        this.RegisterCommand(KnownCommandNames.Superscript, (param) => { this.htmlEditorService.Superscript(); });
        this.RegisterCommand(KnownCommandNames.Subscript, (param) => { this.htmlEditorService.Subscript(); });
        this.RegisterCommand(KnownCommandNames.Cut, (param) => { this.htmlEditorService.Cut(); });
        this.RegisterCommand(KnownCommandNames.Copy, (param) => { this.htmlEditorService.Copy(); });
        this.RegisterCommand(KnownCommandNames.Paste, (param) => { this.htmlEditorService.Paste(); });
        this.RegisterCommand(KnownCommandNames.Unlink, (param) => { this.htmlEditorService.Unlink(); });
        this.RegisterCommand(KnownCommandNames.JustifyLeft, (param) => { this.htmlEditorService.JustifyLeft(); });
        this.RegisterCommand(KnownCommandNames.JustifyCenter, (param) => { this.htmlEditorService.JustifyCenter(); });
        this.RegisterCommand(KnownCommandNames.JustifyRight, (param) => { this.htmlEditorService.JustifyRight(); });
        this.RegisterCommand(KnownCommandNames.JustifyFull, (param) => { this.htmlEditorService.JustifyFull(); });
        this.RegisterCommand(KnownCommandNames.JustifyNone, (param) => { this.htmlEditorService.JustifyNone(); });
        this.RegisterCommand(KnownCommandNames.InsertUnorderedList, (param) => { this.htmlEditorService.InsertUnorderedList(); });
        this.RegisterCommand(KnownCommandNames.InsertOrderedList, (param) => { this.htmlEditorService.InsertOrderedList(); });
        this.RegisterCommand(KnownCommandNames.ForeColor, (param) => { this.htmlEditorService.ForeColor(); });
        this.RegisterCommand(KnownCommandNames.HiliteColor, (param) => { this.htmlEditorService.HiliteCollor(); });
        this.RegisterCommand(KnownCommandNames.FontName, (param) => { this.htmlEditorService.FontName(); });
        this.RegisterCommand(KnownCommandNames.FontSize, (param) => { this.htmlEditorService.FontSize(); });
        this.RegisterCommand(KnownCommandNames.RemoveFormat, (param) => { this.htmlEditorService.RemoveFormat(); });
        this.RegisterCommand(KnownCommandNames.BlockQuoteName, (param) => { this.htmlEditorService.BlockQuote(); });
        this.RegisterCommand(KnownCommandNames.FormatBlock, (param) => { this.htmlEditorService.FormatBlock(); });
        this.RegisterCommand(KnownCommandNames.InsertContent, (param) => { this.htmlEditorService.InsertContent(); });
        this.RegisterCommand(KnownCommandNames.ToggleFormat, (param) => { this.htmlEditorService.ToggleFormat(); });
        this.RegisterCommand(KnownCommandNames.SetContent, (param) => { this.htmlEditorService.SetContent(); });
        this.RegisterCommand(KnownCommandNames.Indent, (param) => { this.htmlEditorService.Indent(); });
        this.RegisterCommand(KnownCommandNames.Outdent, (param) => { this.htmlEditorService.Outdent(); });
        this.RegisterCommand(KnownCommandNames.InsertHorizontalRule, (param) => { this.htmlEditorService.InsertHorizontalRule(); });
        this.RegisterCommand(KnownCommandNames.ToggleVisualAid, (param) => { this.htmlEditorService.ToggleVisualAid(); });
        this.RegisterCommand(KnownCommandNames.InsertLinkName, (param) => { this.htmlEditorService.InsertLink(); });
        this.RegisterCommand(KnownCommandNames.SelectAll, (param) => { this.htmlEditorService.SelectAll(); });
        this.RegisterCommand(KnownCommandNames.Delete, (param) => { this.htmlEditorService.Delete(); });
        this.RegisterCommand(KnownCommandNames.NewDocument, (param) => { this.htmlEditorService.NewDocument(); });
        this.RegisterCommand(KnownCommandNames.Undo, (param) => { this.htmlEditorService.Undo(); });
        this.RegisterCommand(KnownCommandNames.Redo, (param) => { this.htmlEditorService.Redo(); });
        this.RegisterCommand(KnownCommandNames.AutoResize, (param) => { this.htmlEditorService.AutoResize(); });
        this.RegisterCommand(KnownCommandNames.ShowCharmap, (param) => { this.htmlEditorService.ShowCharmap(); });
        this.RegisterCommand(KnownCommandNames.CodeEditorName, (param) => { this.htmlEditorService.CodeEditor(); });
        this.RegisterCommand(KnownCommandNames.InsertCodeSampleName, (param) => { this.htmlEditorService.InsertCode(); });
        this.RegisterCommand(KnownCommandNames.DirectionLTR, (param) => { this.htmlEditorService.DirectionLTR(); });
        this.RegisterCommand(KnownCommandNames.DirectionRTL, (param) => { this.htmlEditorService.DirectionRTL(); });
        this.RegisterCommand(KnownCommandNames.FullPageProperties, (param) => { this.htmlEditorService.FullPageProperties(); });
        this.RegisterCommand(KnownCommandNames.FullScreen, (param) => { this.htmlEditorService.FullScreen(); });
        this.RegisterCommand(KnownCommandNames.InsertImageName, (param) => { this.htmlEditorService.InsertImage(); });
        this.RegisterCommand(KnownCommandNames.InsertDateName, (param) => { this.htmlEditorService.InsertDate(); });
        this.RegisterCommand(KnownCommandNames.InsertTime, (param) => { this.htmlEditorService.InsertTime(); });
        this.RegisterCommand(KnownCommandNames.EmoticonName, (param) => { this.htmlEditorService.InsertEmoticon(); });
        this.RegisterCommand(KnownCommandNames.InsertDefinitionList, (param) => { this.htmlEditorService.InsertDefinitionList(); });
        this.RegisterCommand(KnownCommandNames.NonBreaking, (param) => { this.htmlEditorService.NonBreaking(); });
        this.RegisterCommand(KnownCommandNames.InsertPageBreakName, (param) => { this.htmlEditorService.InsertPageBreak(); });
        this.RegisterCommand(KnownCommandNames.Preview, (param) => { this.htmlEditorService.Preview(); });
        this.RegisterCommand(KnownCommandNames.Print, (param) => { this.htmlEditorService.Print(); });
        this.RegisterCommand(KnownCommandNames.Save, (param) => { this.htmlEditorService.Save(); });
        this.RegisterCommand(KnownCommandNames.SearchReplace, (param) => { this.htmlEditorService.SearchReplace(); });
        this.RegisterCommand(KnownCommandNames.Spellcheck, (param) => { this.htmlEditorService.Spellcheck(); });
        this.RegisterCommand(KnownCommandNames.InsertTemplate, (param) => { this.htmlEditorService.InsertTemplate(); });
        this.RegisterCommand(KnownCommandNames.ToggleVisualBlocks, (param) => { this.htmlEditorService.ToggleVisualBlocks(); });
        this.RegisterCommand(KnownCommandNames.VisualChars, (param) => { this.htmlEditorService.ToggleVisualChars(); });
        this.RegisterCommand(KnownCommandNames.InsertVideoName, (param) => { this.htmlEditorService.InsertMedia(); });
        this.RegisterCommand(KnownCommandNames.Anchor, (param) => { this.htmlEditorService.InsertAnchor(); });
        this.RegisterCommand(KnownCommandNames.TableSplitCells, (param) => { this.htmlEditorService.TableSplitCells(); });
        this.RegisterCommand(KnownCommandNames.TableMergeCells, (param) => { this.htmlEditorService.TableMergeCells(); });
        this.RegisterCommand(KnownCommandNames.TableInsertRowBefore, (param) => { this.htmlEditorService.TableInsertRowBefore(); });
        this.RegisterCommand(KnownCommandNames.TableInsertRowAfter, (param) => { this.htmlEditorService.TableInsertRowAfter(); });
        this.RegisterCommand(KnownCommandNames.TableInsertColBefore, (param) => { this.htmlEditorService.TableInsertColBefore(); });
        this.RegisterCommand(KnownCommandNames.TableInsertColAfter, (param) => { this.htmlEditorService.TableInsertColAfter(); });
        this.RegisterCommand(KnownCommandNames.TableDeleteCol, (param) => { this.htmlEditorService.TableDeleteCol(); });
        this.RegisterCommand(KnownCommandNames.TableDeleteRow, (param) => { this.htmlEditorService.TableDeleteRow(); });
        this.RegisterCommand(KnownCommandNames.TableCutRow, (param) => { this.htmlEditorService.TableCutRow(); });
        this.RegisterCommand(KnownCommandNames.TableCopyRow, (param) => { this.htmlEditorService.TableCopyRow(); });
        this.RegisterCommand(KnownCommandNames.TablePasteRowBefore, (param) => { this.htmlEditorService.TablePasteRowBefore(); });
        this.RegisterCommand(KnownCommandNames.TablePasteRowAfter, (param) => { this.htmlEditorService.TablePasteRowAfter(); });
        this.RegisterCommand(KnownCommandNames.TableDelete, (param) => { this.htmlEditorService.TableDelete(); });
        this.RegisterCommand(KnownCommandNames.InsertTableName, (param) => { this.htmlEditorService.InsertTable(); });
        this.RegisterCommand(KnownCommandNames.TableRowProps, (param) => { this.htmlEditorService.TableRowProps(); });
        this.RegisterCommand(KnownCommandNames.TableCellProps, (param) => { this.htmlEditorService.TableCellProps(); });
        this.RegisterCommand(KnownCommandNames.EditImage, (param) => { this.htmlEditorService.EditImage(); });

        this.RegisterCommand(KnownCommandNames.PrintPost, (param) => { this.htmlEditorService.Print(); });

        console.log("End register command. ");
        console.log(this.CommandRepository.Commands);
    }
}