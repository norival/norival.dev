/*
 * DONE remove a content from 
 * DONE remove a content from a view
 * DONE JS form validation
 * DONE When adding content to a view, only update screen, do not submit the form
 * TODO manage form errors from php
 * TODO Assets view
 * TODO Users view
 * TODO Create a new view
 * TODO Add inner content in content modification form
 *
 * NOTE For model methods that can be called to fill different part of the View
 * (for example teh content list can be rendered in the content screen or the
 * view screen), I could set an argument 'callback', so it could use a
 * different callback each time
 */

import {AdminModel} from './AdminModel';
import {AdminView} from './AdminView';
import {FormValidator} from '../form/FormValidator';

/**
 * The controller component for the admin MVC app
 */
export class AdminController {
    /**
     * Create an AdminController object
     */
    constructor()
    {
        // initialization
        this.view  = new AdminView();
        this.model = new AdminModel();
    }

    /**
     * Start the controller
     */
    start()
    {
        // bind event handlers for view events ---------------------------------
        // events for clicks on navigation menu
        this.view.bindOnClickHomePage(this.handleClickHomePage);
        this.view.bindOnClickViewsHome(this.handleClickViewsHome);
        this.view.bindOnClickContentHome(this.handleClickContentHome);
        this.view.bindOnClickAssetsHome(this.handleClickAssetsHome);
        this.view.bindOnClickUsersHome(this.handleClickUsersHome);
        this.view.bindOnClickStatsHome(this.handleClickStatsHome);

        // help related events
        this.view.bindClickToggleHelp(this.handleClickToggleHelp);
        this.view.bindClickHelpSection(this.handleClickHelpSection);

        // this.view.bindListContent(this.handleListContent);
        // this.view.bindSearchContent(this.handleSearchContent);
        // this.view.bindNeedContent(this.handleNeedContent);

        // pagination related events
        this.view.bindOnChangeChooseItemsPerPage(this.onChangeChooseItemsPerPage);
        this.view.bindOnClickPaginationPage(this.onClickPaginationPage);

        // views related events
        this.view.bindOnClickNewView(this.onClickNewView);
        this.view.bindOnKeyUpSearchView(this.onKeyUpSearchView);
        this.view.bindOnClickShowView(this.onClickShowView);
        this.view.bindOnClickEditView(this.onClickEditView);
        this.view.bindOnClickDeleteView(this.onClickDeleteView);
        this.view.bindOnClickSaveViewDetails(this.onClickSaveViewDetails);
        this.view.bindOnClickCancelViewDetails(this.onClickCancelViewDetails);
        this.view.bindOnClickRemoveContentFromView(this.onClickRemoveContentFromView);
        this.view.bindOnClickAddContentToView(this.onClickAddContentToView);

        // content related events
        this.view.bindOnClickNewContent(this.onClickNewContent);
        this.view.bindOnKeyUpSearchContent(this.onKeyUpSearchContent);
        this.view.bindOnClickShowContent(this.onClickShowContent);
        this.view.bindOnClickEditContent(this.onClickEditContent);
        this.view.bindOnClickDeleteContent(this.onClickDeleteContent);


        // bind callbacks for model events -------------------------------------
        // help related events
        this.model.bindHelpDataReceived(this.onHelpDataReceived);

        // views related events
        this.model.bindViewsListDataReceived(this.onViewsListDataReceived);

        // content related events
        this.model.bindContentListDataReceived(this.onContentListDataReceived);

        // this.model.bindViewDataChanged(this.onViewDataChanged);
        // this.model.bindVisualViewChanged(this.onVisualViewChanged);
        // this.model.bindContentListChanged(this.onContentListChanged);
        // this.model.bindContentFormChanged(this.onContentFormChanged);
        // this.model.bindContentSuggestionChanged(this.onContentSuggestionChanged);
        // this.model.bindContentReceived(this.onContentReceived);
        // this.model.bindContentCreatedForView(this.onContentCreatedForView);

        // render the home page
        // this.handleClickHomePage();
    }


    /***************************************************************************
     * Handlers for View events
    ***************************************************************************/

    // handlers for navigation menu --------------------------------------------

    /**
     * Handle click on the 'Home' menu entry
     *
     * @callback AdminController~handleClickHomePage
     */
    handleClickHomePage = () => {
        // - Get the notifications (not implemented yet (say 'No notification')
        // this.view.
        this.view.renderHomePage();
        this.model.getHelpData('en', 'general');
    }

    /**
     * Handle click on the 'Views' menu entry
     *
     * @param {{page: int, itemsPerPage: integer}} pagination Pagination state
     * @callback AdminController~handleClickViewsHome
     */
    handleClickViewsHome = (pagination) => {
        this.view.renderViewsHome();
        this.model.listViews(pagination);
        this.model.getHelpData('en', 'view');
    }

    /**
     * Handle click on the 'Content' menu entry
     * 
     * @param {{page: int, itemsPerPage: integer}} pagination Pagination state
     * @callback AdminController~handleClickContentHome
     * @async
     */
    handleClickContentHome = (pagination) => {
        this.view.renderContentHome();
        this.model.listContent(pagination, this.onContentListDataReceived);
        this.model.getHelpData('en', 'content');
    }

    /**
     * Handle click on the 'Assets' menu entry
     *
     * @callback AdminController~handleClickAssetsHome
     */
    handleClickAssetsHome = () => {
        this.view.renderAssestsHome();
    }

    /**
     * Handle click on the 'Users' menu entry
     *
     * @callback AdminController~handleClickUsersHome
     */
    handleClickUsersHome = () => {
        this.view.renderUsersHome();
    }

    /**
     * Handle click on the 'Stats' menu entry
     *
     * @callback AdminController~handleClickStatsHome
     */
    handleClickStatsHome = () => {
        this.view.renderStatsHome();
    }

    
    // handlers for help related events ----------------------------------------

    /**
     * Handle click on the 'toggle-help' button
     *
     * @callback AdminController~handleClickToggleHelp
     */
    handleClickToggleHelp = () => {
        this.view.toggleHelp();
    }

    /**
     * Handle click on a help section
     *
     * @param {string} section The name of the help section to display
     * @callback AdminController~handleClickHelpSection
     */
    handleClickHelpSection = (section) => {
        this.view.toggleHelpSection(section);
    }


    // handlers for pagination events ------------------------------------------

    /**
     * Handle change on the select menu to change number of items per page
     *
     * @param {string} screen The screen from which the call is coming
     * @param {{itemsPerPage: int, numberOfPages: int, page: int, total: int}} paginationState The current
     *      state of the pagination
     * @callback AdminController~handleClickHelpSection
     */
    onChangeChooseItemsPerPage = (screen, paginationState) => {
        switch (screen) {
            case 'viewList':
                this.model.listViews(paginationState);
                break;
            case 'contentList':
                this.model.listContent(paginationState, this.onContentListDataReceived);
                break;
        }
    }

    /**
     * Handle click on a page link
     *
     * @callback AdminController~handleClickHelpSection
     */
    onClickPaginationPage = (screen, paginationState) => {
        switch (screen) {
            case 'viewList':
                this.model.listViews(paginationState);
                break;
            case 'contentList':
                this.model.listContent(paginationState, this.onContentListDataReceived);
                break;
        }
    }


    // handlers for views related events ---------------------------------------

    /**
     * Handle click on the 'new-view' button
     */
    onClickNewView = () => {
        this.view.renderViewForm(null);
    }

    /**
     * Handle key press on search view input
     *
     * @param {Object} query The query
     */
    onKeyUpSearchView = (query) => {
        this.model.searchView(query);
    }

    /**
     * Handle click on the 'show-view' button
     *
     * @param {int} viewId The id of the view to edit
     */
    onClickShowView = (viewId) => {
        this.model.getViewData(viewId, this.onViewDataReceivedForViewScreen);
    }

    /**
     * Handle click on the 'edit-view' button
     *
     * @param {int} viewId The id of the view to edit
     */
    onClickEditView = (viewId) => {
        // TODO
        console.log(`Editing ${viewId}`);
    }

    /**
     * Handle click on the 'delete-view' button
     *
     * @param {int} viewId The id of the view to delete
     */
    onClickDeleteView = (viewId) => {
        // TODO
        console.log(`Deleting ${viewId}`);
    }

    /**
     * Handle click on the 'save' button in view details
     *
     * @param {Element} form The form element to get data from
     */
    onClickSaveViewDetails = (form) => {
        // run form validation
        const formValidator = new FormValidator(form);
        formValidator.validate();

        if (formValidator.isValid) {
            // if the form is valid, submit the data to the server
            this.model.submitViewForm(
                form.dataset.viewId,
                this.view.getViewFormData(form),
                this.onViewFormSubmitted
            );

            return ;
        }

        // render the form errors
        this.view.renderFormErrors(form, formValidator.errors);
    }

    /**
     * Handle click on the 'cancel' button in view details
     */
    onClickCancelViewDetails = () => {
        this.handleClickViewsHome();
    }

    /**
     * Handle click on the 'Remove selected content' button in view details
     *
     * @param {[int]} contentIds An array of content ids to remove from the view
     * @param {int} viewId The id of the view from which contents should be removed
     */
    onClickRemoveContentFromView = (contentIds, viewId) => {
        if (contentIds.length > 0) {
            // TODO ask confirmation before removing contents
            this.model.removeContentFromView(contentIds, viewId, this.onClickShowView);
        }
    }

    /**
     * Handle click on the 'Add content' button in view details
     */
    onClickAddContentToView = () => {
        console.log('add content to view');
    }


    // handlers for content related events -------------------------------------

    /**
     * Handle click on the 'new-content' button
     */
    onClickNewContent = () => {
        console.log('creating new content');
        // TODO
        // this.view.renderContentForm(null);
    }

    /**
     * Handle key press on search content input
     *
     * @param {Object} query The query
     */
    onKeyUpSearchContent = (query) => {
        this.model.searchContent(query);
    }

    /**
     * Handle click on the 'show-content' button
     *
     * @param {int} contentId The id of the view to edit
     */
    onClickShowContent = (contentId) => {
        console.log(`Showing ${contentId}`);
    }

    /**
     * Handle click on the 'edit-content' button
     *
     * @param {int} contentId The id of the view to edit
     */
    onClickEditContent = (contentId) => {
        console.log(`Editing ${contentId}`);
    }

    /**
     * Handle click on the 'delete-content' button
     *
     * @param {int} contentId The id of the view to delete
     */
    onClickDeleteContent = (contentId) => {
        console.log(`Deleting ${contentId}`);
    }



    /***************************************************************************
     * Callbacks for Model events
    ***************************************************************************/

    /***************************************************************************
     * Handlers related to help data
     */

    /**
     * Call this method from the model when the help data has been received
     * 
     * @callback AdminController~onHelpDataReceived
     */
    onHelpDataReceived = (helpData) => {
        this.view.renderHelp(helpData);
    }


    /***************************************************************************
     * Handlers related to view data
     */

    /**
     * Call this method from the model when the list of view has been loaded.
     * 
     * @param {Object} viewListData The list of views
     * @param {{itemsPerPage: int, numberOfPages: int, page: int, total: int}} paginationState The current
     *      state of the pagination
     * @callback AdminController~onViewDataChanged
     */
    onViewsListDataReceived = (viewListData, paginationState) => {
        this.view.renderViewsList(viewListData, paginationState);
    }

    /**
     * Call this method from the model when the data for a specific view has
     * been received and must be displayed in the view screen
     * 
     * @param {Object} viewListData The list of views
     * @param {{itemsPerPage: int, numberOfPages: int, page: int, total: int}} paginationState The current
     *      state of the pagination
     * @callback AdminController~onViewDataChanged
     */
    onViewDataReceivedForViewScreen = (viewData) => {
        this.view.renderViewDetails(viewData);
    }

    /**
     * Call this method when the view form has been submitted by the Model
     *
     * @param {Response} response The response
     */
    onViewFormSubmitted = (response) => {
        // console.log(response);
        if (!response.ok) {
            // TODO handle server errors
            return ;
        }

        this.view.flashBag.push('The view has been updated!');
        this.view.renderViewsHome();
        this.model.listViews();
    }


    /***************************************************************************
     * Handlers related to content data
     */

    /**
     * Call this method from the model when the list of content has been loaded.
     * 
     * @param {Object} viewListData The list of views
     * @param {{itemsPerPage: int, numberOfPages: int, page: int, total: int}} paginationState The current
     *      state of the pagination
     * @callback AdminController~onViewDataChanged
     */
    onContentListDataReceived = (contentListData, paginationState) => {
        this.view.renderContentList(contentListData, paginationState);
    }


    // -------------------------------------------------------------------------
    // not refactored yet ------------------------------------------------------
    // -------------------------------------------------------------------------

    /**
     * Handle click on deleteContentButton
     * @callback AdminController~handleClickDeleteContent
     */
    handleClickDeleteContent = (contentId) => {
        console.log(`deleting content: ${event.target.dataset.contentId}`);
        this.model.deleteContent(contentId);
    }

    /**
     * Handle click on newContentButton
     * @callback AdminController~handleClickNewContent
     */
    handleClickNewContent = () => {
        this.view.renderNewContentForm(null);
        this.view.bindClickAddInnerContent(this.handleClickAddInnerContent);
        this.view.bindClickSubmitNewContent(this.handleClickSubmitNewContent);
    }

    /**
     * Handle the submission of an existing content
     *
     * @param {Element} form The form to validate
     * @callback AdminController~handleClickSubmitContent
     */
    handleClickSubmitContent = (form) => {
        const formValidator = new FormValidator(form);

        formValidator.validate();

        if (formValidator.isValid) {
            this.model.submitContentForm(
                form.dataset.contentId,
                this.view.getContentFormData()
            );

            return;
        }

        // send the errors back to the view
        this.view.renderFormErrors(form, formValidator.errors);
    }

    /**
     * Handle the submission of a new content
     *
     * @param {Element} form The form to validate
     * @param {?number} viewId Null to create a new content only or the id of
     * the view to which the new content must be added
     * @callback AdminController~handleClickSubmitNewContent
     */
    handleClickSubmitNewContent = (form, viewId = null) => {
        const formValidator = new FormValidator(form);

        formValidator.validate();

        if (formValidator.isValid) {
            // submit the content
            this.model.submitNewContentForm(
                this.view.getNewContentFormData(),
                viewId
            );

            return;
        }

        // send the errors back to the view
        this.view.renderFormErrors(form, formValidator.errors);
    }
}
