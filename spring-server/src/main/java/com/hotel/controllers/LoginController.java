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
	
//	@RequestMapping("/index")
//	public String index() {
//		return "login";
//	}
	
	//登录界面
	@RequestMapping(value="/login",method = RequestMethod.POST)
	public String login(Administrator administrator,@Param("limits") String limits,HttpServletRequest req,HttpSession session) throws IOException {
		Administrator thisadministrator = administratorService.login(administrator);
		if (thisadministrator != null) {
			System.out.println("登录界面");
			if(thisadministrator.getlimit().equals(limits)&&limits.equals("front")){
				session.setAttribute("thisadministrator", thisadministrator);
				System.out.println(limits);
				System.out.println("前台界面");
				return "redirect:/front/Home";
			}
			else if(thisadministrator.getlimit().equals(limits)&&limits.equals("administrator")){
				session.setAttribute("thisadministrator", thisadministrator);
				System.out.println("管理员界面");
				return "redirect:/administrator/HomeForAdm";
			}
			else{
				System.out.println("用户名或密码错误!1");
				return "redirect:login";
			}
			
		}
		else{
			System.out.println("用户名或密码错误!2");
			return "redirect:login";
		}
		
	}
	
	//登录界面
	@RequestMapping(value="/loginVerification",method = RequestMethod.POST)
	public String loginVerification(Administrator administrator,@Param("limits") String limits,HttpServletRequest req,HttpServletResponse response, HttpSession session) throws IOException {
		String Id = req.getParameter("Id");
		System.out.println("Id:"+Id);
		String password = req.getParameter("password");
		System.out.println("password:"+password);
		administrator.setAdmId(Id);
		administrator.setaPassword(password);
		Administrator thisadministrator = administratorService.login(administrator);
		//如果在数据库找到有这个Id和password对应的人,但在对比权限是错误,就说明权限错误!
		if (thisadministrator != null) {
			System.out.println("登录界面");
			if(thisadministrator.getlimit().equals(limits)&&limits.equals("front")){
				return null;
			}
			else if(thisadministrator.getlimit().equals(limits)&&limits.equals("administrator")){
				return null;
			}
			else{
				System.out.println("权限错误!");
				response.getWriter().print("errorOfLimit");
				return null;
			}
			
		}
		else{
			System.out.println("用户名或密码错误!");
			response.getWriter().print("errorOfEmpty");
			return null;
		}
		
	}
	
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
	
	//登录
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login() {
		LOG.info("login...");
		return "login";
	}

	@RequestMapping("/logout")
	public String logout(HttpSession session) {
		LOG.info("logout...");
		session.invalidate();
		return "login";
	}
	
}
