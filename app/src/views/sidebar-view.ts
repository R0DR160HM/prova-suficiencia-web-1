import { ISidebarItem } from "../shared/models/SidebarItem.js";
import { View } from "./view.js";

export class SidebarView extends View<ISidebarItem[]> {

    protected template(model: ISidebarItem[]): string {
        return `
        
        <ul class="p-3">
            ${ model.map(item => `
            <li class="p-3">
                <a href="#" id="${ item.id }">
                    <i class="${ item.icon }"></i>
                    <span class="d-none d-lg-inline-block ms-3">${ item.description }</span>
                </a>
            </li>
        `).join(' ') }
        </ul>

        `;
    }

}