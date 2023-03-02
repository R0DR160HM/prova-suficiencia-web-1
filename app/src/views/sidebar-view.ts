import { ISidebarItem } from "../shared/models/SidebarItem.js";
import { View } from "./view.js";

export class SidebarView extends View<ISidebarItem[]> {

    protected template(model: ISidebarItem[]): string {
        return `
        
        <ul class="p-0 p-sm-3">
            ${ model.map(item => `
            <li class="p-sm-3 align-middle">
                <a href="#" id="${ item.id }" aria-label="Acessar tela ${ item.description }">
                    <i class="${ item.icon }"></i>
                    <span class="compact-invisible ms-3">${ item.description }</span>
                </a>
            </li>
        `).join(' ') }
        </ul>

        `;
    }

}