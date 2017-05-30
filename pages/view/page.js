"use strict";

import React, { Component } from 'react';
import { branch } from "baobab-react/higher-order";
import raf from "raf";

import _ from "lodash";
import actions from "../utils/actions";
import commons from "../utils/commons";
import locale from "../utils/locale";
import ajax from "../utils/ajax";

class Page extends Component{
    constructor(props){
        super(props);
        _.bindAll(this, "handleDrawCanvas");
        commons.initComponent(this, { actions: actions });

        this.canvas = {};
        this.ctx = {};

        this.height = window.innerHeight 
            || document.documentElement.clientHeight 
            || document.body.clientHeight 
            || 500;
        this.width = window.innerWidth 
            || document.documentElement.clientWidth 
            || document.body.clientWidth 
            || 1300;

        this.count = 99;
        this.all_array = [];
        //鼠标属性
        this.current_point = {
            x: null, //当前鼠标x
            y: null, //当前鼠标y
            max: 20000 // 圈半径的平方
        }
        this.handleRandomPoints();
    }

    handleRandomPoints(){
        let random_points = [];
        let random = Math.random;
        for (let i = 0; this.count > i; i++) {
            // 随机点
            random_points.push({
            x: random() * this.width,//随机位置
            y: random() * this.height,//随机位置
            xa: 2 * random() - 1,//随机运动方向
            ya: 2 * random() - 1,//随机运动方向
            max: 6000 //沾附距离
            });
        }

        this.all_array = random_points.concat([this.current_point]);
        this.random_points = random_points;
    }

    componentDidMount(){
        this.canvas = this.refs.canvasContent;
		this.context = this.canvas.getContext('2d');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        let self = this;
        raf(function tick() {
            // Animation logic
            self.handleDrawCanvas();  
            raf(tick);
        });
        window.onmousemove = function(e) {
            e = e || window.event;
            self.current_point.x = e.clientX;
            self.current_point.y = e.clientY;
        }, window.onmouseout = function() {
            self.current_point.x = null;
            self.current_point.y = null;
        };
    }

    handleDrawCanvas(){
        this.context.clearRect(0, 0, this.width, this.height);
        this.random_points.forEach((r, idx) => {
            r.x += r.xa, 
            r.y += r.ya, //移动
            r.xa *= r.x > this.width || r.x < 0 ? -1 : 1, 
            r.ya *= r.y > this.height || r.y < 0 ? -1 : 1, //碰到边界，反向反弹
            this.context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //绘制一个宽高为1的点
            //从下一个点开始
            for (let i = idx + 1; i < this.all_array.length; i++) {
                let e = this.all_array[i];
                // 当前点存在
                if (null !== e.x && null !== e.y) {
                    let x_dist = r.x - e.x; //x轴距离 l
                    let y_dist = r.y - e.y; //y轴距离 n
                    let dist = x_dist * x_dist + y_dist * y_dist; //总距离, m
                    let d;
                    dist < e.max && (e === this.current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
                        d = (e.max - dist) / e.max,
                        this.context.beginPath(),
                        this.context.lineWidth = d / 2,
                        this.context.strokeStyle = "rgba(255,0,0)",
                        this.context.moveTo(r.x, r.y),
                        this.context.lineTo(e.x, e.y),
                        this.context.stroke());
                }
            }
        })
    }

    render(){
        return (
            <div>
                <div className="container">
                    <canvas className="canvas" ref="canvasContent" ></canvas>
                </div>
            </div>
        )
    }
}

export default branch({
    data: ['page']
}, Page);