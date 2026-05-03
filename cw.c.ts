import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';

interface EntityUserMapping {
  id: number;
  entity: string;
  users: string[];
}

interface ChineseWallAccessRight {
  id: number;
  entity: string;
  correspondence: boolean;
  executedDocumentation: boolean;
  maos: boolean;
  editing?: boolean;
}

@Component({
  selector: 'app-chinese-wall',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MaterialModule],
  templateUrl: './chinese-wall.component.html',
  styleUrls: ['./chinese-wall.component.scss']
})
export class ChineseWallComponent {
  activeTab: 'entity-user-mapping' | 'access-rights' = 'entity-user-mapping';

  sidebarSearch = '';
  filterEntity = '';

  newEntity = '';
  newChineseUser = '';
  selectedUser = '';

  selectedUsers: string[] = [];

  sidebarItems = [
    {
      name: 'Entity-User Mapping',
      route: '/beagle/chinese-wall/entity-user-mapping',
      tab: 'entity-user-mapping'
    },
    {
      name: 'Chinese Wall Access Rights',
      route: '/beagle/chinese-wall/access-rights',
      tab: 'access-rights'
    }
  ];

  entityUserMappings: EntityUserMapping[] = [
    {
      id: 1,
      entity: 'BNP Paribas Fortis [GEBA-BRU]',
      users: [
        'Hilde Van Verre',
        'Stephanie Vereecken',
        'Suzy Vande Wiele',
        'Gregoire Marville',
        'Mark Van Wynsberge',
        'Tine Castelein',
        'Stephanie Debrosse',
        'Magali Machado Vieira',
        'Philippe Martens',
        'Aminata Diakite',
        'Koenraad Podevyn',
        'Alison Pluquet',
        'Tim Cosyns'
      ]
    }
  ];

  accessRights: ChineseWallAccessRight[] = [
    {
      id: 1,
      entity: 'BNP Paribas Fortis [GEBA-BRU]',
      correspondence: true,
      executedDocumentation: true,
      maos: false
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      const tab = params.get('tab');

      if (tab === 'access-rights') {
        this.activeTab = 'access-rights';
      } else {
        this.activeTab = 'entity-user-mapping';
      }
    });
  }

  get filteredSidebarItems() {
    if (!this.sidebarSearch.trim()) {
      return this.sidebarItems;
    }

    return this.sidebarItems.filter(item =>
      item.name.toLowerCase().includes(this.sidebarSearch.toLowerCase())
    );
  }

  get filteredMappings() {
    if (!this.filterEntity.trim()) {
      return this.entityUserMappings;
    }

    return this.entityUserMappings.filter(item =>
      item.entity.toLowerCase().includes(this.filterEntity.toLowerCase())
    );
  }

  get filteredAccessRights() {
    if (!this.filterEntity.trim()) {
      return this.accessRights;
    }

    return this.accessRights.filter(item =>
      item.entity.toLowerCase().includes(this.filterEntity.toLowerCase())
    );
  }

  filter() {
    // Dummy frontend filter handled by getters
  }

  addUserToList() {
    if (this.newChineseUser.trim()) {
      this.selectedUsers.push(this.newChineseUser.trim());
      this.newChineseUser = '';
    }
  }

  removeSelectedUser() {
    this.selectedUsers = this.selectedUsers.filter(user => user !== this.selectedUser);
    this.selectedUser = '';
  }

  addMapping() {
    if (!this.newEntity.trim() || this.selectedUsers.length === 0) {
      return;
    }

    this.entityUserMappings.push({
      id: Date.now(),
      entity: this.newEntity.trim(),
      users: [...this.selectedUsers]
    });

    this.newEntity = '';
    this.selectedUsers = [];
  }

  deleteMapping(id: number) {
    this.entityUserMappings = this.entityUserMappings.filter(item => item.id !== id);
  }

  editMapping(item: EntityUserMapping) {
    this.newEntity = item.entity;
    this.selectedUsers = [...item.users];
  }

  makeEditable(item: ChineseWallAccessRight) {
    this.accessRights.forEach(row => row.editing = false);
    item.editing = true;
  }

  saveAccessRight(item: ChineseWallAccessRight) {
    item.editing = false;
  }

  cancelAccessRight(item: ChineseWallAccessRight) {
    item.editing = false;
  }
}
