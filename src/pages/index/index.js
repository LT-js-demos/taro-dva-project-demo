import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import PropTypes from 'prop-types'
import {AtButton, AtInput} from 'taro-ui'
import './index.scss'
import createAction from '../../utils/action'

const mapStateToProps = ({global, products}) => ({global, products})
const mapDispatchToProps = ({
  onDelete: payload => createAction('products/delete', payload),
  onAdd: payload => createAction('products/add', payload),
  onInit: () => createAction('products/init')
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends Component {
  static propTypes = {
    global: PropTypes.object,
    products: PropTypes.object,
    onDelete: PropTypes.func,
    onAdd: PropTypes.func,
    onInit: PropTypes.func
  }


  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
  }

  componentDidMount() {
    this.props.onInit()
  }

  config = {
    navigationBarTitleText: '首页'
  }

  handleDelete = (id) => {
    this.props.onDelete({id: id})
  }

  handleAdd = () => {
    this.props.onAdd({inputValue: this.state.inputValue})
    this.setState({inputValue: ''})
  }

  handleInputChange = (val) => {
    this.setState({
      inputValue: val
    })
  }


  render() {
    const {global: {title}, products: {list, userName}} = this.props
    return (
      <View className='index'>
        <View>{title} {userName}</View>
        <View className='at-row'>
          <View className='at-col'>
            <AtInput name='' onChange={this.handleInputChange} value={this.state.inputValue} />
          </View>
          <View className='at-col at-col-2'>
            <AtButton size='small' onClick={(val) => this.handleAdd(val)}>新增</AtButton>
          </View>
        </View>

        {
          list && list.map((item) => {
            const {productName, id} = item
            return (

              <View className='at-row' key={id}>
                <View className='at-col' onClick={() => this.showEditInput(id)}>#{id} {productName}</View>
                <View className='at-col at-col-2'>
                  <AtButton size='small' onClick={() => this.handleDelete(id)}>删除</AtButton></View>
              </View>

            )
          })
        }

      </View>
    )
  }
}
