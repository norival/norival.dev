import {Utils} from '../utils/Utils';

export class Components {
    /**
     * Create an element to render in not implemented features
     *
     * @returns {Element}
     */
    static notImplementedFeature()
    {
        const div = Utils.createElement('div', 'notImplemented');
        const p   = Utils.createElement('p');
        const img = Utils.createElement('img');

        p.innerHTML = 'Working on it! Come back later!';

        img.src = require('../../images/bud.gif');

        div.appendChild(p);
        div.appendChild(img);

        return div;
    }

    /**
     * contentList
     *
     * The content list component.
     *
     * @param {Object} contentList The content list
     * @param {number} id The html id of the content list
     * @param {bool} forViewScreen Whether the content is nested inside
     * the content list. Used when rendering content list from the View screen.
     *
     * @returns {Element}
     */
    static contentList(contentList, id, forViewScreen = false)
    {
        const table = Utils.createElement('table', null, id);
        const tbody = Utils.createElement('tbody');

        const thead = Utils.createElement('thead');
        let th      = Utils.createElement('th');

        th.innerHTML = 'Name';
        thead.appendChild(th);

        th = Utils.createElement('th');
        th.innerHTML = 'Type';
        thead.appendChild(th);

        table.appendChild(thead);

        contentList.forEach(element => {
            if (forViewScreen) {
                element = element.content;
            }

            tbody.appendChild(this.contentListRow(element, forViewScreen));
        });

        table.appendChild(tbody);

        return table;
    }

    /**
     * Create a single row for the content list
     *
     * @param {Object} content An object representation of the content
     * @param {bool} forViewScreen Whether the content is nested inside
     * @returns {Element}
     */
    static contentListRow(content, forViewScreen = false)
    {
        let tr = Utils.createElement('tr');
        let td = Utils.createElement('td');
        let a  = Utils.createElement('a');

        tr.dataset.contentId = content.id;

        a.text              = content.name;
        a.href              = '#';
        a.dataset.action    = 'edit';
        a.dataset.contentId = content.id;

        td.appendChild(a)
        tr.appendChild(td);

        td = Utils.createElement('td');
        a  = Utils.createElement('a');

        a.text               = content.type;
        a.href               = '#';
        a.dataset.contentId  = content.id;
        td.dataset.contentId = content.id;

        td.appendChild(a)
        tr.appendChild(td);

        td = Utils.createElement('td');


        a  = Utils.createElement('a', [
            'button',
            forViewScreen ? 'remove' : 'delete'
        ]);

        a.text               = forViewScreen ? 'Remove' : 'Delete';
        a.href               = '#';
        a.dataset.contentId  = content.id;
        a.dataset.action     = forViewScreen ? 'removeFromView' : 'delete';
        td.dataset.contentId = content.id;

        td.appendChild(a)
        tr.appendChild(td);

        return tr;
    }

    /**
     * Create a form to modify a content
     *
     * @param {object?} contentData The content data or null to create a new content
     *
     * @static
     * @returns {Element}
     */
    static contentForm(contentData) {
        const div  = Utils.createElement('div', null, 'contentForm');
        const form = Utils.createElement('form');

        if (contentData) {
            form.dataset.contentId = contentData.id;
        }

        let fieldset = Utils.createElement('fieldset');
        let h3       = Utils.createElement('h3');

        h3.innerHTML = 'Informations';
        fieldset.appendChild(h3);

        let ul = Utils.createElement('ul');

        let li    = Utils.createElement('li');
        let input = Utils.createElement('input');
        let label = Utils.createElement('label');

        label.setAttribute('for', 'name');
        label.innerHTML = 'Name';
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'name');
        input.value = contentData ? contentData.name : '';
        // validation
        input.dataset.required = true;
        input.dataset.type     = 'text';
        input.dataset.name     = 'Name';

        li.appendChild(label);
        li.appendChild(input);
        ul.appendChild(li);

        li    = Utils.createElement('li');
        input = Utils.createElement('input');
        label = Utils.createElement('label');

        label.setAttribute('for', 'type');
        label.innerHTML = 'Type';
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'type');
        input.value = contentData ? contentData.type : '';
        // validation
        input.dataset.required = true;
        input.dataset.type     = 'text';
        input.dataset.name     = 'Type';

        li.appendChild(label);
        li.appendChild(input);
        ul.appendChild(li);

        fieldset.appendChild(ul);

        form.appendChild(fieldset);

        fieldset = Utils.createElement('fieldset');
        h3       = Utils.createElement('h3');

        h3.innerHTML = 'Content';
        fieldset.appendChild(h3);

        ul = Utils.createElement('ul', null, 'innerContentList');

        if (contentData) {
            for (let property in contentData.content) {
                let li    = Utils.createElement('li');
                let label = Utils.createElement('label');
                let input = Utils.createElement('input');

                label.innerHTML = property;
                label.setAttribute('for', `content_${property}`);

                input.setAttribute('type', 'text');
                input.setAttribute('name', `content_${property}`);
                input.value = contentData.content[property];

                // validation
                input.dataset.type = 'text';
                input.dataset.name = Utils.capitalizeFirst(property);

                li.appendChild(label);
                li.appendChild(input);

                ul.appendChild(li);
            }
        }

        fieldset.appendChild(ul);
        form.appendChild(fieldset);

        let button = Utils.createElement('button', null, 'submitContentFormButton');
        ul         = Utils.createElement('ul');
        li         = Utils.createElement('li');

        button.innerHTML         = 'Save';
        button.dataset.contentId = contentData ? contentData.id : '';

        li.appendChild(button);
        ul.appendChild(li);

        button = Utils.createElement('button', 'cancelButton', 'cancelContentFormButton');
        li     = Utils.createElement('li');

        button.innerHTML        = 'Cancel';
        button.dataset.parentId = 'contentForm';

        li.appendChild(button);
        ul.appendChild(li);

        form.appendChild(ul);
        div.appendChild(form);

        return div;
    }

    /**
     * Create the view homepage
     *
     * @returns {Element}
     */
    static viewsHome()
    {
        const viewDiv = Utils.createElement('div', null, 'viewOutput');
        const header  = Utils.createElement('header', 'adminPanel');
        const title   = Utils.createElement('h2');
        const helpDiv = Utils.createElement('div', 'help');
        const message = Utils.createElement('p');
        const p       = Utils.createElement('p');

        title.innerHTML = 'Views';

        message.innerHTML = `
            On this screen, you can manage your views.
        `;

        p.innerHTML = `
            A view is a collection of contents that are rendered together
            within a template or from an API query.
        `;
        helpDiv.appendChild(p);

        header.appendChild(title);
        header.appendChild(message);
        header.appendChild(helpDiv);

        viewDiv.appendChild(header);

        return viewDiv;
    }

    /**
     * Create a list of available views
     *
     * @param {Array} viewList The content list
     *
     * @returns {Element}
     */
    static viewList(viewList)
    {
        const outputDiv = Utils.createElement('div');
        const listTitle = Utils.createElement('h3');
        const ul        = Utils.createElement('ul', null, 'viewList');

        listTitle.innerHTML = 'List of available views';

        viewList.forEach((view) => {
            // create list item
            let li = Utils.createElement('li');
            let a  = Utils.createElement('a', 'button', 'editView');

            li.innerHTML = view.name;

            a.href         = '#';
            a.text         = 'Edit';
            a.dataset.name = view.name;
            a.dataset.id   = view.id

            li.appendChild(a);

            // adds button for visual editing of view (experimental)
            a = Utils.createElement('a', ['button', 'beta'], 'editViewVisual');

            a.href         = '#';
            a.text         = 'Visual edit';
            a.dataset.name = view.name;
            a.dataset.id   = view.id

            li.appendChild(a);
            ul.appendChild(li);
        });

        outputDiv.appendChild(listTitle);
        outputDiv.appendChild(ul);

        return outputDiv;
    }

    /**
     * Create a form to modify a View
     *
     * @param {object} viewData The view data
     *
     * @returns {Element}
     */
    static viewForm(viewData)
    {
        const viewDiv = Utils.createElement('div', null, 'viewFormOutput');
        const form    = Utils.createElement('form', null, 'viewForm');

        let h3       = Utils.createElement('h3');
        h3.innerHTML = `View: ${viewData.name}`;
        viewDiv.appendChild(h3);

        let fieldset = Utils.createElement('fieldset');
        let h4       = Utils.createElement('h4');
        h4.innerHTML = 'Informations';

        fieldset.appendChild(h4);

        let ul      = Utils.createElement('ul');
        const infos = {'name': viewData.name, 'title': viewData.title}

        for (const key in infos) {
            let li    = Utils.createElement('li');
            let input = Utils.createElement('input');
            let label = Utils.createElement('label');

            input.setAttribute('type', 'text');
            input.setAttribute('name', key);
            input.value = infos[key];
            label.innerHTML = Utils.capitalizeFirst(key);
            label.setAttribute('for', key);

            input.dataset.required = true;
            input.dataset.type     = 'text';
            input.dataset.name     = Utils.capitalizeFirst(key);

            li.appendChild(label);
            li.appendChild(input);
            ul.appendChild(li);
        }

        fieldset.appendChild(ul);
        form.appendChild(fieldset);

        form.dataset.viewId = viewData.id;
        viewDiv.appendChild(form);

        h3           = Utils.createElement('h3');
        h3.innerHTML = 'Content list';
        viewDiv.appendChild(h3);

        viewDiv.appendChild(this.contentList(viewData.viewContents, 'contentList', true));

        ul = Utils.createElement('ul', null, 'buttonList');

        let li = Utils.createElement('li');

        let button            = Utils.createElement('button', null, 'addContentButton');
        button.innerHTML      = 'Add content';
        button.dataset.viewId = viewData.id;
        li.appendChild(button);
        ul.appendChild(li);

        li                    = Utils.createElement('li');
        button                = Utils.createElement('button', null, 'submitViewButton');
        button.innerHTML      = 'Save';
        button.dataset.viewId = viewData.id;
        li.appendChild(button);
        ul.appendChild(li);

        li                      = Utils.createElement('li');
        button                  = Utils.createElement('button', 'cancelButton', 'cancelContentEditButton');
        button.innerHTML        = 'Cancel';
        button.dataset.parentId = 'viewFormOutput';
        li.appendChild(button);
        ul.appendChild(li);

        viewDiv.appendChild(ul);

        return viewDiv;
    }

    /**
     * Create form to ask which type of content must be added
     *
     * @param {integer} viewId The id of the view for which we want to add a content
     * @returns {Element}
     */
    static askNewContentForm(viewId)
    {
        const addContentDiv = Utils.createElement('div', null, 'askNewContentType');
        const ul = Utils.createElement('ul');

        // set data-group: used to easily remove groups of divs
        addContentDiv.dataset.group = 'addContentToView';

        let li           = Utils.createElement('li');
        let a            = Utils.createElement('a', 'button', 'createContent');
        a.text           = 'Create new Content';
        a.href           = "#";
        a.dataset.viewId = viewId;
        li.appendChild(a);
        ul.appendChild(li);

        li               = Utils.createElement('li');
        a                = Utils.createElement('a', 'button', 'useContent');
        a.text           = 'Use existing Content';
        a.href           = "#";
        a.dataset.viewId = viewId;
        li.appendChild(a);
        ul.appendChild(li);

        addContentDiv.appendChild(ul);

        return addContentDiv;
    }

    /**
     * Create a search content form
     *
     * @returns {Element}
     */
    static searchContentForm()
    {
        const searchContentDiv = Utils.createElement('div', null, 'searchContent');
        const form             = Utils.createElement('form', null, 'searchContentForm');
        const input            = Utils.createElement('input');

        searchContentDiv.dataset.group = 'addContentToView';

        form.appendChild(input);
        searchContentDiv.appendChild(form);

        return searchContentDiv;
    }

    /**
     * Create list to display content suggestions
     *
     * @param {Array} suggestion An array of content suggestions
     * @returns {undefined}
     */
    static contentSuggestion(suggestion)
    {
        const ul = Utils.createElement('ul');

        suggestion.forEach(element => {
            let li              = Utils.createElement('li');
            let a               = Utils.createElement('a');
            a.href              = '#';
            a.innerHTML         = element.name;
            a.dataset.contentId = element.id;

            li.appendChild(a);
            ul.appendChild(li);
        });

        return ul;
    }

    /**
     * Create a div to display a content
     *
     * @param {Object} content The content to be displayed
     * @returns {Element}
     */
    static content(content)
    {
        const div = Utils.createElement('div', 'contentDisplay', 'contentDisplay');

        let ul      = Utils.createElement('ul', null, 'contentInformations');
        let li      = Utils.createElement('li');
        let title   = Utils.createElement('h4');
        let article = Utils.createElement('article', 'content');

        div.dataset.contentId = content.id;
        div.dataset.group     = 'addContentToView';

        title.innerHTML = 'Informations';
        article.appendChild(title);

        li.innerHTML = `Name: ${content.name}`;
        ul.appendChild(li);

        li           = Utils.createElement('li');
        li.innerHTML = `Type: ${content.type}`;
        ul.appendChild(li);

        li           = Utils.createElement('li');
        li.innerHTML = `Creation date: ${Utils.formatDate(content.created_at)}`;
        ul.appendChild(li);

        if (content.updated_at) {
            li           = Utils.createElement('li');
            li.innerHTML = `Last updated: ${Utils.formatDate(content.updated_at)}`;
            ul.appendChild(li);

        }

        // set content informations in the list dataset for easy retrieval
        ul.dataset.contentId   = content.id;
        ul.dataset.contentName = content.name;
        ul.dataset.contentType = content.type;
        ul.dataset.createdAt   = content.created_at;
        ul.dataset.updatedAt   = content.updated_at ? content.updated_at : '';

        article.appendChild(ul);
        div.appendChild(article);

        // render the content
        article = Utils.createElement('article', 'content');
        title   = Utils.createElement('h4');
        ul      = Utils.createElement('ul');

        title.innerHTML = 'Content';
        article.appendChild(title);

        for (const key in content.content) {
            li           = Utils.createElement('li');
            li.innerHTML = `${Utils.capitalizeFirst(key)}: ${content.content[key]}`;

            ul.appendChild(li);
        }
        article.appendChild(ul);

        div.appendChild(article);

        return div;
    }

    /**
     * Create a form to create a new content
     *
     * @static
     * @returns {Element}
     */
    static newContentForm()
    {
        const form             = this.contentForm(null);
        const innerContentList = form.querySelector('#innerContentList');

        // count the number of inner contents
        innerContentList.dataset.innerContentCount = 0;

        const li         = Utils.createElement('li');
        const button     = Utils.createElement('a', 'button', 'addInnerContent');
        button.innerHTML = 'Add Content';
        button.href      = '#';

        li.appendChild(button);
        innerContentList.appendChild(li);

        // ---------------------------------------------------------------------
        // Tests !!
        // ---------------------------------------------------------------------
        form.querySelector('[name="name"]').value = 'Test content name';
        form.querySelector('[name="type"]').value = 'Test content type';
        // ---------------------------------------------------------------------

        return form;
    }

    /**
     * Create a form to add an inner content
     *
     * @param {number} count The current number of inner contents added
     * @returns {Element}
     * @static
     */
    static newInnerContentForm(count)
    {
        const name    = Utils.createElement('input');
        const content = Utils.createElement('input');

        let li = Utils.createElement('li');
        // li.dataset.innerContentNumber = count;

        let label = Utils.createElement('label');
        name.setAttribute('type', 'text');
        name.setAttribute('name', `contentName_${count}`);
        name.value = `test_inner_content_name_${count}`;
        label.setAttribute('for', `contentName_${count}`);
        label.innerHTML = 'Name';
        // validation
        name.dataset.required = true;
        name.dataset.type     = 'text';
        name.dataset.name     = Utils.capitalizeFirst(`contentContent_${count}`);

        li.appendChild(label);
        li.appendChild(name);

        label = Utils.createElement('label');
        content.setAttribute('type', 'text');
        content.setAttribute('name', `contentContent_${count}`);
        content.value = `test inner content content ${count}`;
        label.setAttribute('for', `contentContent_${count}`);
        label.innerHTML = 'Content';
        li.appendChild(label);
        li.appendChild(content);

        return li;
    }
}
