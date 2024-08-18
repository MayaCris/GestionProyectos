import { ControllerUser } from '../controller/controllerUser.js';

export class dashboardView {
    constructor() {
        this.controllerUser = new ControllerUser();
        this.dialog = document.querySelector('dialog');
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('load', () => this.controllerUser.checkAuthentication());
        window.addEventListener('hashchange', () => this.controllerUser.checkAuthentication());

        $(".add-row").on("click", () => this.handleAddRow());
        $(".remove-row").on("click", () => this.handleRemoveRow());
        
        $(document).on("click", ".mdl-checkbox", (event) => this.toggleRowSelection(event));
        $(document).on("click", "#checkbox-all", () => this.toggleAllRows());
        $(document).on("click", "span.mdl-data-table__label.add-table-content", (event) => this.addContentDialog(event));
        $(document).on("click", ".close", (event) => this.closeDialog(event));
        $(document).on("keydown", ".mdl-dialog__addContent", (event) => this.handleDialogKeydown(event));
        $(document).on("click", ".save", (event) => this.saveContent(event));

        this.dialog.querySelector('.close').addEventListener('click', () => this.dialog.close());
        this.dialog.querySelector('.remove').addEventListener('click', () => this.removeSelectedRows());
    }

    handleAddRow() {
        $(".mdl-dialog__addContent").remove();
        this.addNewRow();
    }

    handleRemoveRow() {
        $(".mdl-dialog__addContent").remove();
        if ($(".mdl-data-dynamictable tbody").find('tr.is-selected').length != 0) {
            this.dialog.showModal();
        }
    }

    toggleRowSelection(event) {
        var _tableRow = $(event.currentTarget).parents("tr:first");
        if ($(event.currentTarget).hasClass("is-checked") === false) {
            _tableRow.addClass("is-selected");
        } else {
            _tableRow.removeClass("is-selected");
        }
    }

    toggleAllRows() {
        var _isChecked = $("#checkbox-all").parent("label").hasClass("is-checked");
        if (_isChecked === false) {
            $(".mdl-data-dynamictable").find('tr').addClass("is-selected");
            $(".mdl-data-dynamictable").find('tr td label').addClass("is-checked");
        } else {
            $(".mdl-data-dynamictable").find('tr').removeClass("is-selected");
            $(".mdl-data-dynamictable").find('tr td label').removeClass("is-checked");
        }
    }

    addContentDialog(event) {
        var _modal, _pattern = '', _error = '';

        $(".mdl-dialog__addContent").remove();
        if ($(event.currentTarget).parents("td:first").hasClass("mdl-data-table__cell--non-numeric") === false) {
            _pattern = 'pattern="^(?:19|20)\\d\\d-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$"';
            _error = "Please, add a date (YYYY-MM-DD).";
        }

        var template = $('#addContentDialogTemplate').html();
        _modal = template.replace(/{{title}}/, $(event.currentTarget).attr("title"))
                         .replace(/{{pattern}}/, _pattern)
                         .replace(/{{error}}/, _error);
        $(event.currentTarget).parent().prepend(_modal);
        componentHandler.upgradeDom();
        $(".mdl-textfield__input").focus();
    }

    closeDialog(event) {
        $(event.currentTarget).parents(".mdl-dialog__addContent").remove();
    }

    handleDialogKeydown(event) {
        var code = (event.keyCode ? event.keyCode : event.which);
        if (code === 13) {
            $(".save.mdl-button").click();
        } else if (code === 27) {
            $(".close.mdl-button").click();
        }
    }

    saveContent(event) {
        var _textfield = $(event.currentTarget).parents("td").find(".mdl-textfield");
        var _input = $(event.currentTarget).parents("td").find("input");
        if (_textfield.hasClass("is-invalid") === false && $.trim(_input.val()) !== "") {
            var _col = $(event.currentTarget).parents("td:first");
            var value = _col.hasClass("price") ? "₺ " : "";
            _col.html(value + _input.val());
        }
    }

    removeSelectedRows() {
        $(".mdl-data-dynamictable tbody").find('tr.is-selected').remove();
        $(".mdl-data-dynamictable thead tr").removeClass("is-selected");
        $(".mdl-data-dynamictable thead tr th label").removeClass("is-checked");
        componentHandler.upgradeDom();

        if ($(".mdl-data-dynamictable tbody").find('tr').length < 1) {
            this.addNewRow();
        }
        this.dialog.close();
    }

    addNewRow() {
        var _row = $(".mdl-data-dynamictable tbody").find('tr');
        var template = $('#basketItemTemplate').html();
        var _newRow = template.replace(/{{id}}/gi, 'checkbox-' + new Date().getTime());

        $(".mdl-data-dynamictable tbody").append(_newRow);
        componentHandler.upgradeAllRegistered();
    }
}

$(document).ready(() => new dashboardView());

