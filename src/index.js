import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import './scss/index.scss';

// В инстанс класса Excel передется селектор для вставки приложения и набор опций в объекте вторым аргументом (массив компонентов, или блоков, из которых формируется конечный
// функционал приложения)
const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table] // Массив просто классов, даже не инстансов
})

excel.render()