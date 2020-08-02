package com.hotel.controllers;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hotel.entity.Administrator;
//import com.github.pagehelper.PageHelper;
//import com.github.pagehelper.PageInfo;
import com.hotel.controllers.AdministratorController;
import com.hotel.serviceimpl.AdministratorServiceImpl;

@Controller
@RequestMapping("")
public class LoginController {
	private static final Logger LOG = Logger.getLogger(AdministratorController.class);
	@Autowired
	private AdministratorServiceImpl administratorService;
	
	// 用户名验证
	@RequestMapping(value = "/validateId",method = RequestMethod.POST)
	@ResponseBody
	public Boolean validateId(HttpServletRequest req) {
		LOG.info("validateId...");
		String AdmId = req.getParameter("AdmId");
		System.out.println("AdmId: "+AdmId);
		Administrator administrator = new Administrator(AdmId);
		if( administratorService.validateId(administrator) == null ) { // 用户名不存在
			return false;
		}
		return true;
	}

	// 用户名密码验证
	@RequestMapping(value = "/validatePassword",method = RequestMethod.POST)
	@ResponseBody
	public Boolean validatePassword(HttpServletRequest req) {
		LOG.info("validatePassword...");
		String AdmId = req.getParameter("AdmId");
		System.out.println("AdmId: "+AdmId);
		String aPassword = req.getParameter("aPassword");
		System.out.println("aPassword: "+aPassword);
		Administrator administrator = new Administrator(AdmId,aPassword,"");
		if( administratorService.login(administrator) == null ) { // 密码错误
			return false;
		}
		return true;
	}

	// 权限验证
	@RequestMapping(value = "/validateLimit",method = RequestMethod.POST)
	@ResponseBody
	public String validateLimit(HttpServletRequest req) {
		LOG.info("validateLimit...");
		String AdmId = req.getParameter("AdmId");
		System.out.println("AdmId: "+AdmId);
		String aPassword = req.getParameter("aPassword");
		System.out.println("aPassword: "+aPassword);
		String limit = req.getParameter("limit");
		Administrator administrator = new Administrator(AdmId,aPassword,limit);
		Administrator loginor = administratorService.login(administrator);
		System.out.println("loginer: "+loginor);
		if( loginor == null ) { // 权限错误
			return "false";
		}
		return loginor.toString();
	}
	
}
