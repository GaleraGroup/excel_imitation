import { ExcelComponent } from "@core/ExcelComponent";

export class Header extends ExcelComponent {
    static className = 'excel__header';
    toHTML() {
        return `
            <input type="text" class="input" value="Новая таблица"/>
            <div>
                <div class="button">
                    <span class="material-icons">
                        clear
                    </span>
                    <span class="material-icons">
                        logout
                    </span>
                </div>
            </div>
        `
    }
}