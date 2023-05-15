import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  categoryTree: any = [];
  categoryMap: any = [];
  selectedAddParent: any = null;
  selectedDeleteParent: any = null;
  selectedEditParent: any = null;
  countSubcategories: any;

  addCategoryForm!: FormGroup;
  saveButtonText: string = 'Save';

  addingSubcategory: boolean = false;

  // set active tab dynamically
  activeTabIndex: number = 0;

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.addCategoryForm = new FormGroup({
      name: new FormControl(''),
      shortText: new FormControl(''),
      longText: new FormControl(''),
      media: new FormControl([]),
      parent: new FormControl(''),
      subCategories: new FormControl([]),
    });

    // to show categories
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res.result;
      console.log(this.categories);
      this.buildCategoryTree();
    });
  }

  // this function is used to make category tree in nested way
  private buildCategoryTree() {
    //to map the categories by id with updated categories
    const categoryMap = [];
    for (const category of this.categories) {
      categoryMap[category.id] = {
        ...category,
        subCategories: [],
      };
    }

    //to build the category tree with updated categories
    const categoryTree = [];
    for (const category of this.categories) {
      if (category.parent === null) {
        categoryTree.push(categoryMap[category.id]);
      } else {
        const parentCategory = categoryMap[category.parent];
        if (parentCategory) {
          parentCategory.subCategories.push(categoryMap[category.id]);
        }
      }
    }
    this.categoryTree = categoryTree;
    console.log(categoryTree);
  }

  // setting parent of selected category in newly added subCategory
  toggleAddingSubcategory(parentCategory: any) {
    console.log(parentCategory);
    this.addCategoryForm.reset();
    this.addingSubcategory = true;
    this.selectedAddParent = parentCategory;
    this.addCategoryForm.controls['parent'].setValue(parentCategory);
    console.log(this.addCategoryForm.value);
  }

  toggleAddingCategory() {
    this.addingSubcategory = false;
  }

  // find subcategories recursively
  getSubcategoriesForCategory(categoryId: any, categoryTree: any): any[] {
    const subcategories: any[] = [];

    function findSubcategories(category: any) {
      if (category.id === categoryId) {
        subcategories.push(...category.subCategories);
      } else {
        for (const subcategory of category.subCategories) {
          findSubcategories(subcategory);
        }
      }
    }

    for (const category of categoryTree) {
      findSubcategories(category);
    }
    return subcategories;
  }

  // counting subcategories recursively
  countSubcategoriesForCategory(categoryId: any, categoryTree: any): number {
    const subcategories = this.getSubcategoriesForCategory(
      categoryId,
      categoryTree
    );

    let count = subcategories.length;

    for (const subcategory of subcategories) {
      count += this.countSubcategoriesForCategory(subcategory.id, categoryTree);
    }
    return count;
  }

  // counting subcategories for selected category
  deletingSubcategory(parentCategory: any) {
    this.selectedDeleteParent = parentCategory;
    console.log(this.selectedDeleteParent);

    this.countSubcategories = this.countSubcategoriesForCategory(
      this.selectedDeleteParent,
      this.categoryTree
    );
  }

  // to add categories/subcategories
  addCategories() {
    this.saveButtonText = 'Saving';
    const formData = this.addCategoryForm.value;

    this.categoryService
      .addCategories(formData, formData.parent)
      .subscribe((res: any) => {
        console.log(res);
        // update categories after adding new category/subCategory
        this.categories.push(res.result[0]);
        this.buildCategoryTree();

        this.saveButtonText = 'Saved';
        setTimeout(() => {
          this.saveButtonText = 'Save';
        }, 1000);
        this.addCategoryForm.reset();
      });
  }

  // to delete categories/subcategories
  deleteCategory(categoryId: any) {
    this.categoryService.deleteCategory(categoryId).subscribe((res: any) => {
      console.log(res);
      const index = this.categories.findIndex(
        (category: any) => category.id === categoryId
      );
      if (index >= 0) {
        this.categories.splice(index, 1);
        this.buildCategoryTree();
      }
    });
  }

  // fill the form with current data
  editCategory(categoryId: string) {
    this.selectedEditParent = categoryId;
    console.log(categoryId);
    const category = this.categories.find((c: any) => c.id === categoryId);
    this.addCategoryForm.patchValue({
      name: category.name,
      shortText: category.shortText,
      longText: category.longText,
      media: category.media,
    });
  }

  //to update categories/subcategories
  updateCategory(categoryId: string) {
    this.saveButtonText = 'Saving';
    const formData = this.addCategoryForm.value;

    this.categoryService
      .editCategoryInfo(categoryId, formData)
      .subscribe((res: any) => {
        console.log(res);

        // Update the category in the categories list
        const editedCategoryIndex = this.categories.findIndex(
          (category: any) => category.id === categoryId
        );
        this.categories[editedCategoryIndex] = res.result;

        // Fetch the updated category data from the server
        this.categoryService.getCategories().subscribe((res: any) => {
          this.categories = res.result;
          this.buildCategoryTree();

          this.saveButtonText = 'Saved';
          this.addCategoryForm.reset();
          setTimeout(() => {
            this.saveButtonText = 'Save';
          }, 1000);
        });
      });
  }
}
