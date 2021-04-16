import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css'
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;

// const StyledAppBlock = styled(AppBlock)`
//     background-color: grey;
// `;

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
             data : [
                {label: 'Going to learn React', important: true, like: false, id: 1},
                {label: "That's good", important: false, like: false, id: 2},
                {label: 'I need a breake...', important: false, like: false, id: 3}
            ],

            term: '',
            filter: 'all'

        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.OnToggleLike = this.OnToggleLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4;
    }

    onToggleImportant(id) {
        this.setState (({data}) => {
            const index = data.findIndex((elem) => elem.id === id);
            const oldItem = data[index];
            const newItem = {...oldItem, important: !oldItem.important};
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
     
            return {
                data: newArr
            }
        });
    }

    OnToggleLike(id) {
        this.setState(({data}) => {
            const index = data.findIndex(item => item.id === id);
            const oldItem = data[index];
            const newItem = {...oldItem, like: !oldItem.like}

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return {
                data: newArr
            }
        })
    }

    deleteItem(id) {
        this.setState(({data}) => {
            
            const index = data.findIndex((elem) => elem.id === id);

            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArr
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    searchPost(items, term) {
        if(term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        });
    }

    onUpdateSearch(term) {
        this.setState({term})
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;

        const allPosts = data.length;
        const liked = data.filter(item => item.like).length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader
                liked={liked}
                allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                    onUpdateSearch={this.onUpdateSearch}/>
                    <PostStatusFilter
                    filter={filter}
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList posts={visiblePosts}
                onDelete={this.deleteItem}
                onToggleImportant={this.onToggleImportant} 
                OnToggleLike={this.OnToggleLike}/>
                <PostAddForm
                onAdd={this.addItem}/>
            </AppBlock>
        )
    }
}
